import React, { useState, useEffect, useRef } from 'react';
import { auth, signInWithGoogle, logout, db } from './../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, set, push, onValue, serverTimestamp, update, remove } from 'firebase/database';
import AgoraRTC from 'agora-rtc-sdk-ng';

const AGORA_APP_ID = "05191a83d499435dbc285b7be763efd7";
const AGORA_TEMP_TOKEN = "007eJxTYAjewKJvkbTP+KL9p4+PZyQ+fGv0Vfrgz5JlVW8cy0wzfuYoMBiYGloaJloYp5hYWpoYm6YkJRtZmCaZJ6WamxmnpqWY6563zmoIZGR4JvKQmZEBAkF8TobcxMw83eSMxBIGBgB+LiMW";
const AGORA_CHANNEL_NAME = "main-chat";

export default function Chat() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Կանխում է սպիտակ էջի խնդիրը սկզբնական բեռնման ժամանակ
  const [usersList, setUsersList] = useState([]);
  const [activechatUser, setActiveChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(true);
  
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [editingMessageId, setEditingMessageId] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, msgId: null, currentText: '', msgType: '' });

  const [callSession, setCallSession] = useState(null);
  const [inCall, setInCall] = useState(false);
  const [callType, setCallType] = useState('video');
  const [micMuted, setMicMuted] = useState(false);
  const [camMuted, setCamMuted] = useState(false);

  const agoraClientRef = useRef(null);
  const localTracksRef = useRef([]);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteUserTrackRef = useRef(null);

  const dummySpace = useRef();
  const prevMessagesCountRef = useRef(0);

  const notificationSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2357/2357-84.wav');

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false); // Հենց Firebase-ը պատասխանում է, անջատում ենք լոադինգը
      
      if (currentUser) {
        const userRef = ref(db, `users/${currentUser.uid}`);
        set(userRef, {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL || '',
          lastSeen: serverTimestamp()
        });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const usersRef = ref(db, 'users');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allUsers = Object.values(data).filter(u => u.uid !== user.uid);
        setUsersList(allUsers);
      } else {
        setUsersList([]);
      }
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user || !activechatUser) {
      setMessages([]);
      prevMessagesCountRef.current = 0;
      return;
    }
    const chatId = user.uid > activechatUser.uid 
      ? `${user.uid}_${activechatUser.uid}` 
      : `${activechatUser.uid}_${user.uid}`;

    const messagesRef = ref(db, `chats/${chatId}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedMessages = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        
        if (fetchedMessages.length > prevMessagesCountRef.current) {
          const lastMsg = fetchedMessages[fetchedMessages.length - 1];
          if (lastMsg.uid !== user.uid && prevMessagesCountRef.current !== 0) {
            notificationSound.play().catch(e => console.log(e));
            
            if (Notification.permission === 'granted') {
              new Notification(lastMsg.displayName, {
                body: lastMsg.type === 'audio' ? '🎤 Ձայնային հաղորդագրություն' : lastMsg.text,
                icon: lastMsg.photoURL || 'https://via.placeholder.com/150'
              });
            }
          }
        }

        setMessages(fetchedMessages);
        prevMessagesCountRef.current = fetchedMessages.length;
        setTimeout(() => dummySpace.current?.scrollIntoView({ behavior: 'smooth' }), 50);
      } else {
        setMessages([]);
        prevMessagesCountRef.current = 0;
      }
    });
    return () => unsubscribe();
  }, [user, activechatUser]);

  useEffect(() => {
    if (!user) return;
    const callRef = ref(db, `calls/${user.uid}`);
    const unsubscribe = onValue(callRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.status === "ringing") {
        setCallSession(data);
        setCallType(data.type || 'video');
      } else {
        setCallSession(null);
      }
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const handleCloseMenu = () => setContextMenu(prev => ({ ...prev, visible: false }));
    window.addEventListener('click', handleCloseMenu);
    return () => window.removeEventListener('click', handleCloseMenu);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !activechatUser || !user) return;

    const chatId = user.uid > activechatUser.uid 
      ? `${user.uid}_${activechatUser.uid}` 
      : `${activechatUser.uid}_${user.uid}`;

    if (editingMessageId) {
      const msgRef = ref(db, `chats/${chatId}/messages/${editingMessageId}`);
      await update(msgRef, {
        text: newMessage,
        isEdited: true
      });
      setEditingMessageId(null);
    } else {
      const chatMessagesRef = ref(db, `chats/${chatId}/messages`);
      const newMsgRef = push(chatMessagesRef);

      await set(newMsgRef, {
        text: newMessage,
        type: 'text',
        createdAt: serverTimestamp(),
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || ''
      });
    }
    setNewMessage('');
  };

  const startRecording = async () => {
    if (!user || !activechatUser) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        if (audioChunksRef.current.length === 0) return;
        
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result;
          
          const chatId = user.uid > activechatUser.uid 
            ? `${user.uid}_${activechatUser.uid}` 
            : `${activechatUser.uid}_${user.uid}`;

          const chatMessagesRef = ref(db, `chats/${chatId}/messages`);
          const newMsgRef = push(chatMessagesRef);

          await set(newMsgRef, {
            audioUrl: base64Audio,
            text: '🎤 Voice message',
            type: 'audio',
            createdAt: serverTimestamp(),
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL || ''
          });
        };
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Խոսափողի հասանելիության սխալ:", err);
      alert("Հնարավոր չէ միացնել խոսափողը։");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleContextMenu = (e, msg) => {
    if (!user || msg.uid !== user.uid) return;
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      msgId: msg.id,
      currentText: msg.text,
      msgType: msg.type
    });
  };

  const handleDeleteMessage = async () => {
    if (!contextMenu.msgId || !activechatUser || !user) return;
    const chatId = user.uid > activechatUser.uid 
      ? `${user.uid}_${activechatUser.uid}` 
      : `${activechatUser.uid}_${user.uid}`;
      
    const msgRef = ref(db, `chats/${chatId}/messages/${contextMenu.msgId}`);
    await remove(msgRef);
    setContextMenu(prev => ({ ...prev, visible: false }));
  };

  const handleStartEdit = () => {
    if (contextMenu.msgType === 'audio') {
      alert("Ձայնային հաղորդագրությունը հնարավոր չէ խմբագրել։");
      return;
    }
    setEditingMessageId(contextMenu.msgId);
    setNewMessage(contextMenu.currentText);
    setContextMenu(prev => ({ ...prev, visible: false }));
  };

  const handleSelectUser = (selectedUser) => {
    setActiveChatUser(selectedUser);
    setMobileSidebarOpen(false);
    setEditingMessageId(null);
    setNewMessage('');
  };

  const startCall = async (type) => {
    if (!activechatUser || !user) return;

    setCallType(type);
    setMicMuted(false);
    setCamMuted(type === 'audio');
    
    const targetCallRef = ref(db, `calls/${activechatUser.uid}`);
    await set(targetCallRef, {
      channelName: AGORA_CHANNEL_NAME,
      callerId: user.uid,
      callerName: user.displayName,
      callerPhoto: user.photoURL || '',
      status: "ringing",
      type: type
    });

    const myCallRef = ref(db, `calls/${user.uid}`);
    await set(myCallRef, {
      channelName: AGORA_CHANNEL_NAME,
      status: "dialing",
      type: type
    });

    initAgora();
  };

  const acceptCall = () => {
    if (!callSession || !user) return;
    
    const type = callSession.type || 'video';
    setCallType(type);
    setMicMuted(false);
    setCamMuted(type === 'audio');

    const callerRef = ref(db, `calls/${callSession.callerId}`);
    set(callerRef, { status: "connected", channelName: AGORA_CHANNEL_NAME, type });

    const myCallRef = ref(db, `calls/${user.uid}`);
    set(myCallRef, { status: "connected", channelName: AGORA_CHANNEL_NAME, type });

    initAgora();
  };

  const rejectCall = () => {
    if (!callSession || !user) return;
    const callerRef = ref(db, `calls/${callSession.callerId}`);
    set(callerRef, null);

    const myCallRef = ref(db, `calls/${user.uid}`);
    set(myCallRef, null);
    endAgora();
  };

  const initAgora = async () => {
    setInCall(true);
    agoraClientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    agoraClientRef.current.on("user-published", async (remoteUser, mediaType) => {
      await agoraClientRef.current.subscribe(remoteUser, mediaType);
      
      if (mediaType === "video" && callType === 'video') {
        remoteUserTrackRef.current = remoteUser.videoTrack;
        if (remoteVideoRef.current) {
          remoteUser.videoTrack.play(remoteVideoRef.current);
        }
      }
      if (mediaType === "audio") {
        remoteUser.audioTrack.play();
      }
    });

    agoraClientRef.current.on("user-unpublished", (remoteUser, mediaType) => {
      if (mediaType === "video") {
        remoteUserTrackRef.current = null;
      }
    });

    agoraClientRef.current.on("user-left", () => {
      endCall();
    });

    await agoraClientRef.current.join(AGORA_APP_ID, AGORA_CHANNEL_NAME, AGORA_TEMP_TOKEN, null);

    if (callType === 'video') {
      const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      localTracksRef.current = [audioTrack, videoTrack];
      if (localVideoRef.current) {
        videoTrack.play(localVideoRef.current);
      }
    } else {
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      localTracksRef.current = [audioTrack];
    }

    await agoraClientRef.current.publish(localTracksRef.current);
  };

  const toggleMic = () => {
    if (localTracksRef.current[0]) {
      localTracksRef.current[0].setEnabled(micMuted);
      setMicMuted(!micMuted);
    }
  };

  const toggleCam = () => {
    if (callType === 'audio') return;
    const videoTrack = localTracksRef.current[1];
    if (videoTrack) {
      videoTrack.setEnabled(camMuted);
      setCamMuted(!camMuted);
    }
  };

  const endCall = async () => {
    if (activechatUser) {
      set(ref(db, `calls/${activechatUser.uid}`), null);
    }
    if (user) {
      set(ref(db, `calls/${user.uid}`), null);
    }
    endAgora();
  };

  const endAgora = async () => {
    localTracksRef.current.forEach(track => {
      track.stop();
      track.close();
    });
    localTracksRef.current = [];
    remoteUserTrackRef.current = null;
    if (agoraClientRef.current) {
      await agoraClientRef.current.leave();
    }
    setInCall(false);
    setCallSession(null);
  };

  // 1. Ստուգման ընթացքում ցույց ենք տալիս բեռնման էկրան
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-[#f0f2f5] font-sans">
        <div className="text-gray-600 text-lg font-semibold animate-pulse">Բեռնվում է...</div>
      </div>
    );
  }

  // 2. Եթե լոգին եղած չէ, ցույց է տալիս Google Մուտքի կոճակը
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen font-sans bg-[#f0f2f5] px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Welcome to ChatHub</h2>
        <button 
          onClick={signInWithGoogle} 
          className="flex items-center gap-2 px-6 py-3 text-base sm:text-lg font-semibold bg-[#4285F4] text-white border-none rounded-full hover:bg-[#357ae8] transition-colors shadow-lg active:scale-95 cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.64 24.55c0-1.65-.15-3.23-.42-4.75H24v9h12.75c-.55 2.86-2.16 5.27-4.57 6.89l7.98 6.19C44.3 38.62 46.64 32.17 46.64 24.55z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.98-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.98-6.19c-2.33 1.52-5.18 2.4-7.91 2.4-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
          Sign in with Google
        </button>
      </div>
    );
  }

  // 3. Հիմնական հավելվածը (աշխատում է միայն երբ user-ը գոյություն ունի)
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#dfdfdf] p-0 sm:p-4 md:p-6 font-sans relative">
      
      {callSession && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center flex flex-col items-center gap-4">
            <img src={callSession.callerPhoto} alt="caller" className="w-20 h-20 rounded-full object-cover border-2 border-[#0b93f6]" />
            <h4 className="text-xl font-bold text-gray-900">{callSession.callerName}</h4>
            <p className="text-gray-500 animate-pulse">
              Incoming {callSession.type === 'audio' ? 'voice' : 'video'} call...
            </p>
            <div className="flex gap-4 w-full mt-2">
              <button onClick={acceptCall} className="flex-1 bg-green-500 text-white py-2.5 rounded-xl font-semibold hover:bg-green-600 transition-colors cursor-pointer">Accept</button>
              <button onClick={rejectCall} className="flex-1 bg-red-500 text-white py-2.5 rounded-xl font-semibold hover:bg-red-600 transition-colors cursor-pointer">Reject</button>
            </div>
          </div>
        </div>
      )}

      {inCall && (
        <div className="absolute inset-0 bg-slate-900 z-40 flex flex-col">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 p-4 gap-4 bg-slate-950">
            {callType === 'video' ? (
              <>
                <div className="relative bg-slate-800 rounded-xl overflow-hidden shadow-inner border border-slate-700/50">
                  <div ref={localVideoRef} className={`w-full h-full ${camMuted ? 'hidden' : 'block'}`} />
                  {camMuted && <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">Camera Off</div>}
                  <span className="absolute bottom-3 left-3 bg-black/50 px-3 py-1 text-xs text-white rounded-md font-medium">You</span>
                </div>
                <div className="relative bg-slate-800 rounded-xl overflow-hidden shadow-inner border border-slate-700/50">
                  <div ref={remoteVideoRef} className="w-full h-full" />
                  <span className="absolute bottom-3 left-3 bg-black/50 px-3 py-1 text-xs text-white rounded-md font-medium">Remote User</span>
                </div>
              </>
            ) : (
              <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center gap-4 bg-slate-900 text-white">
                <div className="w-24 h-24 bg-[#0b93f6] rounded-full flex items-center justify-center font-bold text-3xl animate-pulse shadow-xl">
                  📞
                </div>
                <h3 className="text-xl font-semibold">Voice Call in Progress</h3>
                <p className="text-slate-400 text-sm">{micMuted ? "Your mic is muted" : "Speaking..."}</p>
              </div>
            )}
          </div>
          
          <div className="h-24 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-4">
            <button 
              onClick={toggleMic} 
              className={`p-3.5 rounded-full font-semibold transition-all active:scale-95 shadow-md cursor-pointer ${micMuted ? 'bg-red-500 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
            >
              {micMuted ? "🔇 Mic Off" : "🎙️ Mic On"}
            </button>

            {callType === 'video' && (
              <button 
                onClick={toggleCam} 
                className={`p-3.5 rounded-full font-semibold transition-all active:scale-95 shadow-md cursor-pointer ${camMuted ? 'bg-red-500 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
              >
                {camMuted ? "📷 Cam Off" : "📹 Cam On"}
              </button>
            )}

            <button onClick={endCall} className="bg-red-500 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/30 cursor-pointer">
              End Call
            </button>
          </div>
        </div>
      )}

      <div className="flex h-full w-full max-w-[1300px] max-h-[850px] bg-white sm:rounded-2xl shadow-2xl border-none sm:border sm:border-solid sm:border-gray-300/70 overflow-hidden">
        
        <aside className={`${mobileSidebarOpen ? 'flex' : 'hidden'} md:flex w-full md:w-80 border-r border-solid border-gray-200 flex-col bg-[#f8f9fa] shrink-0 h-full`}>
          <header className="flex justify-between items-center p-4 bg-white border-b border-solid border-gray-200 h-[65px] shrink-0">
            <div className="flex items-center gap-3 overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="profile" className="w-9 h-9 rounded-full object-cover shadow-sm border border-gray-200" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#0b93f6] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {user?.displayName?.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="font-semibold truncate text-gray-900 text-sm">{user?.displayName}</span>
            </div>
            <button onClick={logout} className="py-1 px-3 text-xs cursor-pointer border border-solid border-gray-300 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm shrink-0 active:scale-95">
              Logout
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-1">
            <p className="text-xs font-bold text-gray-400 px-3 py-1.5 uppercase tracking-wider">Contacts</p>
            {usersList.length === 0 ? (
              <div className="text-center text-gray-400 text-sm mt-5">No other users online</div>
            ) : usersList.map((u) => (
              <button
                key={u.uid}
                onClick={() => handleSelectUser(u)}
                className={`flex items-center gap-3.5 w-full p-3 rounded-xl text-left transition-all cursor-pointer ${
                  activechatUser?.uid === u.uid ? 'bg-[#0b93f6] text-white shadow-md' : 'hover:bg-gray-200/60 text-black active:bg-gray-200'
                }`}
              >
                {u.photoURL ? (
                  <img src={u.photoURL} alt={u.displayName} className="w-11 h-11 rounded-full object-cover shrink-0 border border-gray-200" referrerPolicy="no-referrer" />
                ) : (
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm ${activechatUser?.uid === u.uid ? 'bg-white text-[#0b93f6]' : 'bg-[#0b93f6] text-white'}`}>
                    {u.displayName?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold truncate text-sm">{u.displayName}</span>
                  <span className={`text-xs truncate ${activechatUser?.uid === u.uid ? 'text-gray-100' : 'text-gray-400'}`}>Click to chat</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <main className={`${!mobileSidebarOpen ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-white h-full relative`}>
          {activechatUser ? (
            <>
              <header className="flex justify-between items-center py-2.5 px-4 sm:px-6 bg-white border-b border-solid border-gray-200 h-[65px] shrink-0 z-10">
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <button onClick={() => setMobileSidebarOpen(true)} className="block md:hidden mr-1 p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                  </button>

                  {activechatUser.photoURL ? (
                    <img src={activechatUser.photoURL} alt={activechatUser.displayName} className="w-10 h-10 rounded-full object-cover shadow border border-gray-200" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#0b93f6] text-white flex items-center justify-center font-bold">
                      {activechatUser.displayName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col overflow-hidden">
                    <h3 className="font-semibold text-gray-950 text-sm leading-tight truncate">{activechatUser.displayName}</h3>
                    <span className="text-xs text-green-500 font-medium">Active now</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => startCall('audio')}
                    className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md shadow-blue-500/20 active:scale-95 transition-all border-none cursor-pointer"
                    title="Voice Call"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.954l-1.293.97c1.358 2.43 3.347 4.42 5.776 5.776l.97-1.293a1.875 1.875 0 011.954-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <button 
                    onClick={() => startCall('video')}
                    className="p-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-md shadow-green-500/20 active:scale-95 transition-all border-none cursor-pointer"
                    title="Video Call"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
                      <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3V7.5a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.94-.94 2.56-.27 2.56 1.06v11.38c0 1.33-1.62 2-2.56 1.06z" />
                    </svg>
                  </button>
                </div>
              </header>

              <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-3 bg-[#f4f5f7]">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex items-end gap-2.5 ${msg.uid === user.uid ? 'justify-end' : 'justify-start'}`}>
                    {msg.uid !== user.uid && (
                      msg.photoURL ? (
                        <img src={msg.photoURL} alt={msg.displayName} className="w-7 h-7 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-[#0b93f6] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                          {msg.displayName?.charAt(0).toUpperCase()}
                        </div>
                      )
                    )}
                    <div 
                      onContextMenu={(e) => handleContextMenu(e, msg)}
                      className={`p-3 px-4 max-w-[85%] sm:max-w-[70%] break-words shadow-sm transition-all relative group cursor-pointer select-none ${
                        msg.uid === user.uid 
                          ? 'bg-[#0b93f6] text-white rounded-t-2xl rounded-bl-2xl rounded-br-sm' 
                          : 'bg-white text-gray-900 rounded-t-2xl rounded-br-2xl rounded-bl-sm border border-solid border-gray-100'
                      }`}
                    >
                      {msg.type === 'audio' ? (
                        <audio src={msg.audioUrl} controls className="max-w-full rounded-lg" />
                      ) : (
                        <div>
                          <p className="text-sm">{msg.text}</p>
                          {msg.isEdited && (
                            <span className="block text-[10px] opacity-70 text-right mt-1 italic">խմբագրված</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={dummySpace}></div>
              </div>

              {editingMessageId && (
                <div className="bg-gray-100 px-6 py-2 flex justify-between items-center text-xs text-gray-600 border-t border-gray-200">
                  <span>✏️ Խմբագրվում է հաղորդագրությունը...</span>
                  <button onClick={() => { setEditingMessageId(null); setNewMessage(''); }} className="text-red-500 font-bold hover:underline">Չեղարկել</button>
                </div>
              )}

              <form onSubmit={sendMessage} className="flex gap-2 p-3 sm:p-4 bg-white shrink-0 z-10 border-t border-solid border-gray-100 items-center">
                <button
                  type="button"
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  onTouchStart={startRecording}
                  onTouchEnd={stopRecording}
                  className={`p-3 rounded-full flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 ${
                    isRecording ? 'bg-red-500 text-white animate-pulse scale-110' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title="Hold to record voice message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
                    <path d="M19 10a1 1 0 10-2 0v1a5 5 0 01-10 0v-1a1 1 0 10-2 0v1a7 7 0 006 6.93V21a1 1 0 102 0v-3.07A7 7 0 0019 11v-1z" />
                  </svg>
                </button>

                <input 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)} 
                  placeholder={isRecording ? "Ձայնագրվում է..." : "Գրեք հաղորդագրություն..."}
                  disabled={isRecording}
                  className="flex-1 py-2.5 px-4 border border-solid border-gray-200 rounded-full text-sm outline-none bg-[#f0f2f5] focus:bg-white focus:border-[#0b93f6] transition-all"
                />
                
                <button 
                  type="submit" 
                  className={`py-2.5 px-4 text-white border-none rounded-full cursor-pointer hover:bg-[#0a81d6] transition-all active:scale-95 flex items-center justify-center ${newMessage.trim() ? 'bg-[#0b93f6] shadow-md' : 'bg-gray-300'}`}
                  disabled={!newMessage.trim() || isRecording}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -rotate-45 relative right-0.5">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.94a.75.75 0 00.61.53l6.096.825-6.096.825a.75.75 0 00-.61.53l-2.432 7.94a.75.75 0 00.926.94l19.5-9.25a.75.75 0 000-1.372l-19.5-9.25z" />
                  </svg>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#f8f9fa] text-gray-400 font-medium p-4 text-center">
              <span>Select a contact to start chatting</span>
            </div>
          )}
        </main>

      </div>

      {contextMenu.visible && (
        <div 
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="absolute bg-white border border-gray-200 rounded-lg shadow-xl py-1 w-36 z-50 text-sm font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.msgType !== 'audio' && (
            <button 
              onClick={handleStartEdit}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
            >
              ✏️ Փոխել
            </button>
          )}
          <button 
            onClick={handleDeleteMessage}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer font-medium"
          >
            🗑️ Ջնջել
          </button>
        </div>
      )}
    </div>
  );
}
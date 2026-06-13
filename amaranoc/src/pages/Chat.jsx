import React, { useState, useEffect, useRef } from 'react';
import { auth, signInWithGoogle, logout, db } from './../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, set, push, onValue, serverTimestamp } from 'firebase/database';

export default function Chat() {
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [activechatUser, setActiveChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const dummySpace = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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
        setMessages(fetchedMessages);
        setTimeout(() => dummySpace.current?.scrollIntoView({ behavior: 'smooth' }), 50);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [user, activechatUser]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !activechatUser) return;

    const chatId = user.uid > activechatUser.uid 
      ? `${user.uid}_${activechatUser.uid}` 
      : `${activechatUser.uid}_${user.uid}`;

    const chatMessagesRef = ref(db, `chats/${chatId}/messages`);
    const newMsgRef = push(chatMessagesRef);

    await set(newMsgRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || ''
    });

    setNewMessage('');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen font-sans bg-[#f0f2f5]">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome to ChatHub</h2>
        <button 
          onClick={signInWithGoogle} 
          className="flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-[#4285F4] text-white border-none rounded-full hover:bg-[#357ae8] transition-colors shadow-lg active:scale-95"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.64 24.55c0-1.65-.15-3.23-.42-4.75H24v9h12.75c-.55 2.86-2.16 5.27-4.57 6.89l7.98 6.19C44.3 38.62 46.64 32.17 46.64 24.55z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.98-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.98-6.19c-2.33 1.52-5.18 2.4-7.91 2.4-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#dfdfdf] p-4 md:p-6 font-sans">
      
      <div className="flex h-full w-full max-w-[1300px] max-h-[850px] bg-white rounded-2xl shadow-2xl border border-solid border-gray-300/70 overflow-hidden">
        
        <aside className="w-80 border-r border-solid border-gray-200 flex flex-col bg-[#f8f9fa] shrink-0">
          <header className="flex justify-between items-center p-4 bg-white border-b border-solid border-gray-200 h-[65px] shrink-0">
            <div className="flex items-center gap-3 overflow-hidden">
              {user.photoURL ? (
                <img src={user.photoURL} alt="profile" className="w-9 h-9 rounded-full object-cover shadow-sm border border-gray-200" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#0b93f6] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {user.displayName?.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="font-semibold truncate text-gray-900 text-sm">{user.displayName}</span>
            </div>
            <button 
              onClick={logout} 
              className="py-1 px-3 text-xs cursor-pointer border border-solid border-gray-300 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm shrink-0 active:scale-95"
            >
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
                onClick={() => setActiveChatUser(u)}
                className={`flex items-center gap-3.5 w-full p-3 rounded-xl text-left transition-all ${
                  activechatUser?.uid === u.uid 
                    ? 'bg-[#0b93f6] text-white shadow-md shadow-blue-200' 
                    : 'hover:bg-gray-200/60 text-black active:bg-gray-200'
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

        <main className="flex-1 flex flex-col bg-white">
          {activechatUser ? (
            <>
              <header className="flex items-center gap-3.5 py-2.5 px-6 bg-white border-b border-solid border-gray-200 h-[65px] shrink-0 z-10">
                {activechatUser.photoURL ? (
                  <img src={activechatUser.photoURL} alt={activechatUser.displayName} className="w-10 h-10 rounded-full object-cover shadow border border-gray-200" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#0b93f6] text-white flex items-center justify-center font-bold">
                    {activechatUser.displayName?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col">
                  <h3 className="font-semibold text-gray-950 text-sm leading-tight">{activechatUser.displayName}</h3>
                  <span className="text-xs text-green-500 font-medium">Active now</span>
                </div>
              </header>

              <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-3 bg-[#f4f5f7]">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex items-end gap-2.5 ${msg.uid === user.uid ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.uid !== user.uid && (
                      <>
                        {msg.photoURL ? (
                          <img src={msg.photoURL} alt={msg.displayName} className="w-7 h-7 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-[#0b93f6] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                            {msg.displayName?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </>
                    )}
                    <div 
                      className={`p-3 px-4 max-w-[70%] break-words shadow-sm ${
                        msg.uid === user.uid 
                          ? 'self-end bg-[#0b93f6] text-white rounded-t-2xl rounded-bl-2xl rounded-br-sm' 
                          : 'self-start bg-white text-gray-900 rounded-t-2xl rounded-br-2xl rounded-bl-sm border border-solid border-gray-100'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={dummySpace}></div>
              </div>

              <form onSubmit={sendMessage} className="flex gap-2.5 p-4 bg-white shrink-0 z-10 border-t border-solid border-gray-100">
                <input 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)} 
                  placeholder={`Type a message to ${activechatUser.displayName}...`} 
                  className="flex-1 py-3 px-5 border border-solid border-gray-200 rounded-full text-sm outline-none bg-[#f0f2f5] focus:bg-white focus:border-[#0b93f6] focus:shadow-sm transition-all"
                />
                <button 
                  type="submit" 
                  className={`py-0 px-5 text-white border-none rounded-full cursor-pointer hover:bg-[#0a81d6] transition-all active:scale-95 flex items-center justify-center ${newMessage.trim() ? 'bg-[#0b93f6] shadow-md shadow-blue-200' : 'bg-gray-300'}`}
                  disabled={!newMessage.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -rotate-45 relative right-0.5">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.94a.75.75 0 00.61.53l6.096.825-6.096.825a.75.75 0 00-.61.53l-2.432 7.94a.75.75 0 00.926.94l19.5-9.25a.75.75 0 000-1.372l-19.5-9.25z" />
                  </svg>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#f8f9fa] text-gray-400 font-medium">
              Select a contact to start chatting
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
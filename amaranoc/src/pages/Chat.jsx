import React, { useState, useEffect, useRef } from 'react';
import { auth, signInWithGoogle, logout, db } from './../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';

export default function Chat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const dummySpace = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(fetchedMessages);
      
      setTimeout(() => dummySpace.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });

    return () => unsubscribe();
  }, [user]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: serverTimestamp(),
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL
    });

    setNewMessage('');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen font-sans">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Chat App</h2>
        <button 
          onClick={signInWithGoogle} 
          className="px-5 py-2.5 text-base cursor-pointer bg-[#4285F4] color-white text-white border-none rounded-md hover:bg-[#357ae8] transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-[600px] my-0 mx-auto border border-solid border-[#ccc] font-sans bg-white">
      <header className="flex justify-between items-center py-2.5 px-5 bg-[#f5f5f5] border-b border-solid border-[#ccc]">
        <h3 className="font-semibold">Logged in as: {user.displayName}</h3>
        <button 
          onClick={logout} 
          className="py-1 px-2.5 cursor-pointer border border-solid border-[#ccc] rounded bg-white hover:bg-gray-100 transition-colors"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 p-5 overflow-y-auto flex flex-col gap-2.5">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`p-2.5 px-3.5 rounded-[20px] max-w-[70%] break-words ${
              msg.uid === user.uid 
                ? 'self-end bg-[#0b93f6] text-white' 
                : 'self-start bg-[#e5e5ea] text-black'
            }`}
          >
            <p className="text-xs m-0 mb-1 opacity-70 font-bold">{msg.displayName}</p>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={dummySpace}></div>
      </main>

      <form onSubmit={sendMessage} className="flex border-t border-solid border-[#ccc]">
        <input 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type a message..." 
          className="flex-1 p-3.5 border-none text-base outline-none"
        />
        <button 
          type="submit" 
          className="py-0 px-5 bg-[#0b93f6] text-white border-none text-base cursor-pointer hover:bg-[#0a81d6] transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
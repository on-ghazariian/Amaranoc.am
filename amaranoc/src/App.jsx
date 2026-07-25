import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "./lib/firebase"; // Ստուգիր firebase.js-ի ճիշտ path-ը
import { onAuthStateChanged } from "firebase/auth";
import { useUserPresence } from "./hooks/useUserPresence"; // Մեր ստեղծած custom hook-ը

import Home from "./pages/Home";
import Like from "./pages/LIke";
import Services from "./pages/Services";
import Chat from "./pages/Chat";
import Zexcher from "./pages/zexcher";
import HomeDetails from "./pages/HomeDetails";
import About from "./pages/about";
import MainLayout from "./layouts/MainLayout";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // 1. Լսում ենք Firebase Auth-ի վիճակը (մուտք է գործել, թե ոչ)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 2. Ակտիվացնում ենք գլոբալ GPS Tracking + Online Status-ը
  useUserPresence(user);

  return (
    <div className="m-0 p-0">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/likes" element={<Like />} />
          <Route path="/services" element={<Services />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/zexch" element={<Zexcher />} />
          <Route path="/home/:id" element={<HomeDetails />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
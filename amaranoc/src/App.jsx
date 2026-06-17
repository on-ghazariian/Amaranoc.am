import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Like from './pages/LIke'
import Services from "./pages/Services";
import Chat from "./pages/Chat";
import "./App.css";
import HomePage from "./components/main/homes/homePage";

function App() {
  return (
    <>
      <div className="m-0 p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/likes" element={<Like />} />
          <Route path="/services" element={<Services />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/home/:id" element={<HomePage />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
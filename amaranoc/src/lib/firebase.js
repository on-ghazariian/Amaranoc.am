import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA-w6nX7vd1Z6LSyVDUc6yWJ_7EjRYExJk",
  authDomain: "amaranoc-da6d9.firebaseapp.com",
  projectId: "amaranoc-da6d9",
  storageBucket: "amaranoc-da6d9.firebasestorage.app",
  messagingSenderId: "249636866726",
  appId: "1:249636866726:web:1d99e7e56402211f718267",
  measurementId: "G-6B14F4MRLB"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);
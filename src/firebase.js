// src/firebase.js (CORRECTED)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // <-- NEW IMPORT
import { getFirestore } from "firebase/firestore"; // <-- NEW IMPORT

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKbjlnMauvdUZS4S8V6FkNaWAEXFQ1fFs",
  authDomain: "insighted-6ba10.firebaseapp.com",
  projectId: "insighted-6ba10",
  storageBucket: "insighted-6ba10.firebasestorage.app",
  messagingSenderId: "945568231794",
  appId: "1:945568231794:web:5a3c1688c1ddfa8dd7edeb",
  measurementId: "G-YNB5VVV6ZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and EXPORT the services
export const auth = getAuth(app); // <-- EXPORTED
export const googleProvider = new GoogleAuthProvider(); // <-- EXPORTED
export const db = getFirestore(app); // <-- EXPORTED

// Note: You can remove the unused getAnalytics import and analytics constant for now.
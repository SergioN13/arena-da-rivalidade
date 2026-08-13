import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDBCVLmiVmX3Ekpq_EvTPTASphkuA4DLTU",
  authDomain: "arena-40cfd.firebaseapp.com",
  projectId: "arena-40cfd",
  storageBucket: "arena-40cfd.firebasestorage.app",
  messagingSenderId: "260049040804",
  appId: "1:260049040804:web:e3f7d30761a80410d8bd31"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuj0oK4-2T6rsYeUs-kLLeuU-2SyTrnJQ",
  authDomain: "twitter-16867.firebaseapp.com",
  projectId: "twitter-16867",
  storageBucket: "twitter-16867.firebasestorage.app",
  messagingSenderId: "270443166466",
  appId: "1:270443166466:web:4fb2cd3d9e2c0e4868e01b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Yetkilendirme kurulumu
export const auth = getAuth(app);
// Google sağlayıcısının kurulumu
export const provider = new GoogleAuthProvider();
// veritabanı kurulumu
export const db = getFirestore(app);
// medya depolama kurulumu
export const storage = getStorage(app);

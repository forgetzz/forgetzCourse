// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCEsj7UBVRJ5FUWfxQlqcsUAqPeP4UL5U0",
  authDomain: "nekoride-cf176.firebaseapp.com",
  projectId: "nekoride-cf176",
  storageBucket: "nekoride-cf176.firebasestorage.app",
  messagingSenderId: "695899911539",
  appId: "1:695899911539:web:e6cab1329a2b8d71fe4106",
  measurementId: "G-Z52Y1Z58ZE"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export { storage };



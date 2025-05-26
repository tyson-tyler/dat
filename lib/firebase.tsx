// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC15I6rRcPfRu3UXjWljKXDyKzTbvc52_8",
  authDomain: "droot-fa272.firebaseapp.com",
  projectId: "droot-fa272",
  storageBucket: "droot-fa272.firebasestorage.app",
  messagingSenderId: "1037014482148",
  appId: "1:1037014482148:web:e7542df67a5a6f408d80f1",
  measurementId: "G-KR5CKVN3FD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = isSupported().then((yes) =>
  yes ? getAnalytics(app) : null
);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const stroage = getStorage(app);

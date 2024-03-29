// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "expense-tracker-a3f72.firebaseapp.com",
  projectId: "expense-tracker-a3f72",
  storageBucket: "expense-tracker-a3f72.appspot.com",
  messagingSenderId: "67615767955",
  appId: "1:67615767955:web:413249197c60974ae83c66",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXQb0fRmJaEtYDQZqzJgJUPogGp9OEqCI",
  authDomain: "hotelbooking-a692f.firebaseapp.com",
  projectId: "hotelbooking-a692f",
  storageBucket: "hotelbooking-a692f.firebasestorage.app",
  messagingSenderId: "216947574761",
  appId: "1:216947574761:web:6685f4e60a39581886ed78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
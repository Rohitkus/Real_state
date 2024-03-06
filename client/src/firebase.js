// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-estate07.firebaseapp.com",
  projectId: "mern-estate07",
  storageBucket: "mern-estate07.appspot.com",
  messagingSenderId: "1070549853879",
  appId: "1:1070549853879:web:31e844c51db868adfd8f32"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
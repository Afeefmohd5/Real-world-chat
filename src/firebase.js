// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0vJ03GFCBdBGX_dpg9se5nks38P8Su74",
  authDomain: "real-time-chatbox-e58a2.firebaseapp.com",
  projectId: "real-time-chatbox-e58a2",
  storageBucket: "real-time-chatbox-e58a2.firebasestorage.app",
  messagingSenderId: "793212683567",
  appId: "1:793212683567:web:966d57d725f1ccc23c8dda",
  measurementId: "G-PWZRRBQPNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth =getAuth(app)
const provider = new GoogleAuthProvider();

const db = getFirestore(app);


export {app,auth,analytics,provider,db}

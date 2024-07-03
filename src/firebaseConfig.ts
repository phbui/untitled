// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCabNiX2hckK2xqvEm8DR6KSwRV4gSO21c",
  authDomain: "untitled-boston.firebaseapp.com",
  databaseURL: "https://untitled-boston-default-rtdb.firebaseio.com",
  projectId: "untitled-boston",
  storageBucket: "untitled-boston.appspot.com",
  messagingSenderId: "1053933068079",
  appId: "1:1053933068079:web:86c9496d823a268ee30bda",
  measurementId: "G-F8F9Q92789",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db, analytics };

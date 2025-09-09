// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiCXhlUxE-OTfu_3jS2vr0_E1KYKrNM50",
  authDomain: "learnify-ydfgroup2.firebaseapp.com",
  databaseURL: "https://learnify-ydfgroup2-default-rtdb.firebaseio.com",
  projectId: "learnify-ydfgroup2",
  storageBucket: "learnify-ydfgroup2.firebasestorage.app",
  messagingSenderId: "330149071608",
  appId: "1:330149071608:web:4b64e760f8793b2835490d",
  measurementId: "G-JGBSE62KS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
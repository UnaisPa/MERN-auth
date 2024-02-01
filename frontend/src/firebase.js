// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-auth-5761d.firebaseapp.com",
  projectId: "mern-auth-5761d",
  storageBucket: "mern-auth-5761d.appspot.com",
  messagingSenderId: "481429195145",
  appId: "1:481429195145:web:7b7c0b908b09b031d43958",
  measurementId: "G-9W4BCPV6YW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
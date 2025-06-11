// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import {getAuth, GoogleAuthProvider} from "firebase/auth";

import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: YOUR_FIREBASE_API_KEY,
  authDomain: "trackit-e0228.firebaseapp.com",
  projectId: "trackit-e0228",
  storageBucket: "trackit-e0228.firebasestorage.app",
  messagingSenderId: "426143253321",
  appId: "1:426143253321:web:f2333bcf08cc49bf2e5098",
  measurementId: "G-W3HNWZ68ER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

//commands used after copy pasting the above content from the firebase website
//firebase login
//firebase init
//firebase deploy

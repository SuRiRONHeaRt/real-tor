// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEncjH2a2VdUrffhhhepbmYZ0-0gXrw1k",
  authDomain: "real-tor.firebaseapp.com",
  projectId: "real-tor",
  storageBucket: "real-tor.appspot.com",
  messagingSenderId: "716173360085",
  appId: "1:716173360085:web:46559651bd09d180339b5c",
};

/* // Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore(); */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };

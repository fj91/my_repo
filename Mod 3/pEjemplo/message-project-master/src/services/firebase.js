// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ2S58UuiU9j_zkGp65eXJ_TqgJnNBSP8",
  authDomain: "message-project-316bf.firebaseapp.com",
  projectId: "message-project-316bf",
  storageBucket: "message-project-316bf.appspot.com",
  messagingSenderId: "571313428454",
  appId: "1:571313428454:web:3166ebac1fe7097399e827",
  measurementId: "G-0R0DK1EPBX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore();
export const storage = getStorage();

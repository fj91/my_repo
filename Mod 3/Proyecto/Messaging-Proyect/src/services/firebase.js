// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOCIDYZ5FIAPtW9yhSl78EvV_24o_ZzNs",
  authDomain: "messaging-project-7d84a.firebaseapp.com",
  projectId: "messaging-project-7d84a",
  storageBucket: "messaging-project-7d84a.appspot.com",
  messagingSenderId: "44376414139",
  appId: "1:44376414139:web:fd93d8e386af149c29969e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore();
export const storage = getStorage();
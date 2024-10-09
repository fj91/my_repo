// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqN-s8UPec5TsC3BIc93u0mTphM62vNDo",
  authDomain: "instagram-clone-11e9e.firebaseapp.com",
  projectId: "instagram-clone-11e9e",
  storageBucket: "instagram-clone-11e9e.appspot.com",
  messagingSenderId: "938636472051",
  appId: "1:938636472051:web:68d5e8c6abb73e135e1186",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore();
export const storage = getStorage();
// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9Jao7ziKlnm1_8fHL5fZncOOn5LdfwZE",
  authDomain: "hackathon-store-99ac0.firebaseapp.com",
  projectId: "hackathon-store-99ac0",
  storageBucket: "hackathon-store-99ac0.appspot.com",
  messagingSenderId: "685197653118",
  appId: "1:685197653118:web:5dcf5ae6d7e9e64b67d42f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

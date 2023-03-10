// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOtBPLScHKLqt4dzR5dW3lJm-vE-kGYyc",
  authDomain: "szakdoga-25f1b.firebaseapp.com",
  projectId: "szakdoga-25f1b",
  storageBucket: "szakdoga-25f1b.appspot.com",
  messagingSenderId: "136270031909",
  appId: "1:136270031909:web:90c79209c812b7d10ea3cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
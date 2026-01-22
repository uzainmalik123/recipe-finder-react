// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeosh4mXZshOnzHPHhTktIgYIvDCH7_3E",
  authDomain: "u-recipe-finder.firebaseapp.com",
  projectId: "u-recipe-finder",
  storageBucket: "u-recipe-finder.firebasestorage.app",
  messagingSenderId: "534625790655",
  appId: "1:534625790655:web:950facec0f10c2b408740a",
  measurementId: "G-7X3LDHG7LF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth, app }
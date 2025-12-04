// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXugoTSWw7gZYWLsvqLNdqaYIdIcdx9O8",
  authDomain: "asfales-9f559.firebaseapp.com",
  projectId: "asfales-9f559",
  storageBucket: "asfales-9f559.firebasestorage.app",
  messagingSenderId: "917627801076",
  appId: "1:917627801076:web:ebf63b47fa266281a9fda1",
  measurementId: "G-PR2FLXWCQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service

export const auth = getAuth(app);
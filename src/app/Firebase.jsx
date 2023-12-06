// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCksqIic3-6s9FWTdD5ePUeXK0m4oFCSCg",
  authDomain: "auth-project-51998.firebaseapp.com",
  projectId: "auth-project-51998",
  storageBucket: "auth-project-51998.appspot.com",
  messagingSenderId: "709140502349",
  appId: "1:709140502349:web:f95b2c7eb444294a16c904"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
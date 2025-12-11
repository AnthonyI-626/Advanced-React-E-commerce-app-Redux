import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLDtJ_zq6ecLqGwxQsgHLX_Ofu94ap5WU",
  authDomain: "fir-project-64f7c.firebaseapp.com",
  projectId: "fir-project-64f7c",
  storageBucket: "fir-project-64f7c.firebasestorage.app",
  messagingSenderId: "1063399974592",
  appId: "1:1063399974592:web:276159d81c3c9ee443ef25",
  measurementId: "G-H8009G5DTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export default (auth);
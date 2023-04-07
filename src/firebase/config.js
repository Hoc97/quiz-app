// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
    authDomain: "fir-message-f089c.firebaseapp.com",
    projectId: "fir-message-f089c",
    storageBucket: "fir-message-f089c.appspot.com",
    messagingSenderId: "768857185759",
    appId: "1:768857185759:web:1372556bf22fcaca2b786a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

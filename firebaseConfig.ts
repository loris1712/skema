import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDvrRzjLkCUgk1KLsbzV5FcEqlpUWbd8TA",
    authDomain: "skema-b76a8.firebaseapp.com",
    projectId: "skema-b76a8",
    storageBucket: "skema-b76a8.firebasestorage.app",
    messagingSenderId: "1019514085126",
    appId: "1:1019514085126:web:56b74491809f408c344887",
    measurementId: "G-ZEB9R9ED0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };

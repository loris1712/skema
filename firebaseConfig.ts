import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import * as firebaseAuth from 'firebase/auth';

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;


import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const auth = initializeAuth(app, {
    persistence: reactNativePersistence(AsyncStorage),
});
export { auth, app, analytics };

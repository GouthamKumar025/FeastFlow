// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxeq4CuRZPVrAj5Bj3SM5hWu267VK_-Ig",
  authDomain: "event-rsvp-d39c2.firebaseapp.com",
  projectId: "event-rsvp-d39c2",
  storageBucket: "event-rsvp-d39c2.firebasestorage.app",
  messagingSenderId: "564956138948",
  appId: "1:564956138948:web:c473d4287e7684b7d32891",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

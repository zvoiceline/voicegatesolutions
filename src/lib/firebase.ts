// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpw4OGD0HnptJf255_NrLjH6z7RAAWGB8",
  authDomain: "voicegate-solutions-d544b.firebaseapp.com",
  projectId: "voicegate-solutions-d544b",
  storageBucket: "voicegate-solutions-d544b.firebasestorage.app",
  messagingSenderId: "659391250224",
  appId: "1:659391250224:web:744e480cdd79fb66f392f5",
  measurementId: "G-PEF2M66MBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shifraai2.firebaseapp.com",
  projectId: "shifraai2",
  storageBucket: "shifraai2.firebasestorage.app",
  messagingSenderId: "52841964831",
  appId: "1:52841964831:web:bcde5272226a4bcb293c2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}


import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5IgNNhmE3DsjThujVLVcYCXrt9T4Jey4",
  authDomain: "flipkar-clone-123.firebaseapp.com",
  projectId: "flipkar-clone-123",
  storageBucket: "flipkar-clone-123.firebasestorage.app",
  messagingSenderId: "862787988351",
  appId: "1:862787988351:web:af247ad27d3c451789084a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
export const db = getFirestore(app);



// Import Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // 👈 add this line

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9XzfjeWZUSl5wmP3aOk71wQ5HfWgQZ5c",
  authDomain: "vighanahartaengineers-a6652.firebaseapp.com",
  projectId: "vighanahartaengineers-a6652",
  storageBucket: "vighanahartaengineers-a6652.firebasestorage.app",
  messagingSenderId: "69192757075",
  appId: "1:69192757075:web:0a3bf4a42e8b10577ffba6"
};
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // 👈 initialize storage

// Export services
export { auth, db, storage }; // 👈 export storage

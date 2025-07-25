
// Firebase Core SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase Services (add as needed)
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCVnhHOnl_xORKjkFPzIQ-awIDZf42I2jk",
  authDomain: "castelle-model.firebaseapp.com",
  projectId: "castelle-model",
  storageBucket: "castelle-model.firebasestorage.app",
  messagingSenderId: "599615271593",
  appId: "1:599615271593:web:7116eb7ff1121bbe432fb8",
  measurementId: "G-D6Q3KYCVK2"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export needed services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

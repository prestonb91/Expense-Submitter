import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { 
  FIREBASE_API_KEY, 
  FIREBASE_AUTH_DOMAIN, 
  FIREBASE_DATABASE_URL, 
  FIREBASE_PROJECT_ID, 
  FIREBASE_STORAGE_BUCKET, 
  FIREBASE_MESSAGING_SENDER_ID, 
  GOOGLE_CLOUD_VISION_API_KEY 
} from "./secret";

// Set up firebase config object
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
}

// Initialize firebase app and services
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export default { firebaseApp, auth, db, storage };

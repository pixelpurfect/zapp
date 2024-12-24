import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // Import Firebase Authentication
import Constants from 'expo-constants';

// Firebase configuration
const firebaseConfig = {
  apiKey: Constants.manifest.extra.FIREBASE_API_KEY,
  authDomain: Constants.manifest.extra.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.manifest.extra.FIREBASE_PROJECT_ID,
  messagingSenderId: Constants.manifest.extra.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.manifest.extra.FIREBASE_APP_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Export Firestore and Authentication instances
export { firestore, auth };


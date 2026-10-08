// src/firebase.js
// Firebase initialization - activates when REACT_APP_FIREBASE_* env vars are set in Vercel.
// Falls back to localStorage if not configured.

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:        process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.REACT_APP_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let db = null;

if (isFirebaseConfigured && getApps().length === 0) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} else if (isFirebaseConfigured && getApps().length > 0) {
  db = getFirestore(getApps()[0]);
}

export { db };

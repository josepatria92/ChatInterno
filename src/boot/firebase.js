import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Web App Configuration
 */

const firebaseConfig = {
    apiKey: process.env.VITE_apiKey,
    authDomain: process.env.VITE_authDomain,
    projectId: process.env.VITE_projectId,
    storageBucket: process.env.VITE_storageBucket,
    messagingSenderId: process.env.VITE_messagingSenderId,
    appId: process.env.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth}
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyD38zSLAwtyfH0qm6W1eA76QzF6xvDWfLs',
    authDomain: 'test1-ed50f.firebaseapp.com',
    projectId: 'test1-ed50f',
    storageBucket: 'test1-ed50f.firebasestorage.app',
    messagingSenderId: '706995261623',
    appId: '1:706995261623:web:49fbaf0aa7bdf85b3efd32',
    measurementId: 'G-XX9K18S1WQ',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const firestore = getFirestore(app);

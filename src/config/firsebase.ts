import  'dotenv/config';
import admin from 'firebase-admin';
import { execPath } from 'node:process';

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
    })
})

export const firestore = firebaseApp.firestore();
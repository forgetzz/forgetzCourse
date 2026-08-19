import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n"
);


const firebaseAdmin: App =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
      });

export const admin = {
  auth: () => getAuth(firebaseAdmin),
  firestore: () => getFirestore(firebaseAdmin),
};
export const adminAuth = getAuth(firebaseAdmin);
export const db = getFirestore(firebaseAdmin);
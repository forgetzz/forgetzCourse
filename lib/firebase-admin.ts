import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
console.log("Firebase Admin config:", {
  projectId: !!projectId,
  clientEmail: !!clientEmail,
  privateKey: !!privateKey,
});
if (!projectId || !clientEmail || !privateKey) {
  throw new Error("Firebase Admin environment variables are missing");
}


const firebaseAdmin: App =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
           projectId,
          clientEmail,
          privateKey,
        }),
      });

export const admin = {
  auth: () => getAuth(firebaseAdmin),
  firestore: () => getFirestore(firebaseAdmin),
};
export const adminAuth = getAuth(firebaseAdmin);
export const db = getFirestore(firebaseAdmin);
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchData<T>(
  collectionName: string
): Promise<T[]> {
  try {
    const snapshot = await getDocs(
      collection(db, collectionName)
    );

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
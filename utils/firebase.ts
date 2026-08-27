
import { doc, DocumentData, Firestore, getDoc, getDocs, collection, WhereFilterOp, query, where } from "firebase/firestore"


export class Firebase  {

   
    async getUser<T extends DocumentData>(
        db: Firestore,
        collection: string,
        userUid: string
    ): Promise<T> {

        const dbRef = await getDoc(doc(db, collection, userUid))
        if (!dbRef.exists()) {
            throw new Error(" YAHH KASIAN ERRORRR HAHAHAHAHAHHA")
        }
       
        const result = dbRef.data() as T
        return result
    }





    async getUsers<T extends DocumentData>(db: Firestore, CollectionName: string): Promise<T[]> {

        const dbRef = await getDocs(collection(db, CollectionName))

        if (dbRef.empty) {
            throw new Error("YAH ERORR KASIAN BANGET KAK")
        }

        const result = dbRef.docs.map((doc) => ({
            ...doc.data()
        }))
        return result as T[]


    }


    async getUserWhere<T extends object, K extends keyof T>(
        db: Firestore,
        collectionName: string,
        field: K,
        Operator: WhereFilterOp,
        value: T[K],
    ): Promise<T[]> {

        const q = query(
            collection(db, collectionName),
            where(field as string, Operator, value)
        )

        const snapshot = await getDocs(q)
        const result = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })) as T[]


        return result


    }






}
 



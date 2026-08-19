"use client"
import { db } from '@/lib/firebase';
import { AuthType, AuthTypeProvider} from '@/types/AuthContextType'
import { User } from '@/types/User';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import React, { createContext, useEffect, useState } from 'react'


export const Authcontext = createContext<AuthType | null>(null)

export function AuthContextProvider({ children }: AuthTypeProvider) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) {
        return;
      }
        setIsLoading(true)
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.log("Data user tidak ditemukan");
          return;
        }

        const data = docSnap.data() as User;
        console.log("DATA:", data)
        setUser(data);

      } catch (error) {
        console.error("Error:", error);
      }finally{
        setIsLoading(false)
      }
    });

    return () => unsubscribe();
  }, []);



  return (
    <Authcontext.Provider value={{
      user,
      isLoading,
    }}>
      {children}
    </Authcontext.Provider>

  )

}

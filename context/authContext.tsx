"use client";

import { AuthType, AuthTypeProvider } from "@/types/AuthContextType";
import { User } from "@/types/User";
import React, {
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";

export const Authcontext =
    createContext<AuthType | null>(null);

export function AuthContextProvider({
    children,
}: AuthTypeProvider) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkSession = useCallback(async () => {
        try {
            const response = await fetch("/api/me", {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            });

            if (!response.ok) {
                setUser(null);
                return;
            }

            const data = await response.json();

            setUser(data.user ?? null);
        } catch (error) {
            console.error("Auth session error:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    return (
        <Authcontext.Provider
            value={{
                user,
                isLoading,
                refreshUser: checkSession,
            }}
        >
            {children}
        </Authcontext.Provider>
    );
}
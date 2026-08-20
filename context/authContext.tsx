"use client";

import { AuthType, AuthTypeProvider } from "@/types/AuthContextType";
import { User } from "@/types/User";
import React, {
    createContext,
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

    useEffect(() => {
        let mounted = true;

        const checkSession = async () => {
            try {
                const response = await fetch("/api/me", {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                });

                if (!response.ok) {
                    if (mounted) {
                        setUser(null);
                    }

                    return;
                }

                const data = await response.json();

                if (mounted) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error(
                    "Auth session error:",
                    error
                );

                if (mounted) {
                    setUser(null);
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        checkSession();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <Authcontext.Provider
            value={{
                user,
                isLoading,
            }}
        >
            {children}
        </Authcontext.Provider>
    );
}
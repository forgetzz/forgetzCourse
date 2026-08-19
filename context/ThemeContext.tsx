"use client"
import { ThemeContextTypes, ThemeProvider } from "@/types/ThemeContext";
import { createContext, useState } from "react";
export const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined)
export function ThemeContextProvider({ children }: ThemeProvider) {
    const [isDark, setIsDark] = useState(true)
    const ThemeToggle = () => setIsDark(prev => !prev)
    return (
        <ThemeContext.Provider value={{
            isDark,
            ThemeToggle
        }}>
            {children}
        </ThemeContext.Provider>
    )
}
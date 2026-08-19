import { ReactNode } from "react"

export interface ThemeContextTypes {
    isDark : boolean
    ThemeToggle: () => void 
}


export interface ThemeProvider {
    children : ReactNode
}
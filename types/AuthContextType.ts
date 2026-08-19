import { ReactNode } from "react"
import { User } from "./User"
export type AuthType = {
    user : User | null
    isLoading: boolean
}

export type AuthTypeProvider = {
    children : ReactNode
}
import { ReactNode } from "react"
import { User } from "./User"
export type AuthType = {
    user : User | null
    isLoading: boolean
      refreshUser: () => Promise<void>;
}

export type AuthTypeProvider = {
    children : ReactNode
}
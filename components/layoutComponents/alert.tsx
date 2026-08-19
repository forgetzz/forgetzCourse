"use client"

import React, { useEffect } from "react"
import { X } from "lucide-react"

type AlertProps = {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    description: string
    color?: "success" | "error"
}

export default function Alert({
    show,
    setShow,
    title,
    description,
    color = "success",
}: AlertProps) {
    if (!show) return null

    const variants = {
        success: {
            border: "border-green-500",
            bg: "bg-green-100",
            title: "text-green-700",
            text: "text-green-600",
        },

        error: {
            border: "border-red-500",
            bg: "bg-red-100",
            title: "text-red-700",
            text: "text-red-600",
        },
    }


    useEffect(() => {
        if (!show) return

        const timer = setTimeout(() => {
            setShow(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [show, setShow])

    if (!show) return null
    return (
        <div
            className={`relative rounded-2xl border p-4 shadow-lg ${variants[color].border} ${variants[color].bg}`}
        >
            <button
                onClick={() => setShow(false)}
                className="absolute right-3 top-3"
            >
                <X size={18} />
            </button>

            <h1 className={`text-lg font-bold ${variants[color].title}`}>
                {title}
            </h1>

            <p className={`mt-1 text-sm ${variants[color].text}`}>
                {description}
            </p>
        </div>
    )
}
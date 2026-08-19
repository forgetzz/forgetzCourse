"use client";

import React from "react";
import {
    MessageCircle,
    ArrowLeft,
    CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";

const packages = [
    {
        packageName: "Beginner" as const,
        price: "FREE",
        description:
            "Pelajari fundamental programming untuk memulai perjalananmu.",
        benefits: [
            "Introduction",
            "HTML & CSS Dasar",
            "JavaScript Fundamental",
            "Git & GitHub",
            "Video Pembelajaran",
            "PDF"
        ],
        badge: "",
    },
    {
        packageName: "Pro" as const,
        price: "Rp 129.000",
        description:
            "Bangun aplikasi web modern dari frontend hingga fullstack.",
        benefits: [
            "subscription",
            "Semua Course Beginner",
            "React.js",
            "Next.js",
            "Javascript Lanjutan",
            "TypeScript",
            "Node.js",
            "Express.js",
            "REST API",
            "PostgreSQL",
            "Prisma",
            "Fullstack Web Development",
            "Pertemuan 1x Seminggu",
        ],
        badge: "REKOMENDASI",
    },
    {
        packageName: "Advance" as const,
        price: "Rp 199.000",
        description:
            "Pelajari AI Engineering, system design, dan production architecture.",
        benefits: [
            "subscription",
            "Private Mentoring",
            "Akses Langsung Informasi",
            "Semua Course Beginner",
            "Semua Course Mid-level",
            "AI Engineering",
            "RAG & LangChain",
            "MCP & AI Agent",
            "Advanced System Design",
            "Production Architecture",
            "Video Module",
            "Pertemuan 3x Seminggu",
        ],
        badge: "EKSKLUSIF",
    },
];

export default function Payment() {
    const phoneNumber = "6289602203266";

    const handlePayment = (
        packageName: string,
        price: string
    ) => {
        const message = encodeURIComponent(
            `Halo, saya ingin membeli paket ${packageName} dengan harga ${price}. Saya ingin melakukan pembayaran melalui WhatsApp.`
        );

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

        window.open(whatsappUrl, "_blank");
    };

    return (
        <div className="px-4 py-10">
            {/* Header */}
            <div className="mx-auto mb-10 max-w-3xl text-center">
                <h1 className="text-4xl font-bold text-gray-900">
                    Pilih Paket Belajar
                </h1>

                <p className="mt-3 text-gray-600">
                    Pilih paket yang sesuai dengan kebutuhan belajar kamu.
                </p>
            </div>

            {/* 3 Payment Cards */}
            <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
                {packages.map((pkg) => {
                    const isRecommended =
                        pkg.badge === "REKOMENDASI";

                    const isExclusive =
                        pkg.badge === "EKSKLUSIF";

                    return (
                        <div
                            key={pkg.packageName}
                            className={cn(
                                "relative flex min-h-[650px] flex-col rounded-2xl border bg-white p-8 shadow-xl",
                                "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",

                                isRecommended &&
                                "border-2 border-green-600",

                                isExclusive &&
                                "border-2 border-yellow-400",

                                !pkg.badge &&
                                "border-gray-200"
                            )}
                        >
                            {/* Badge */}
                            {pkg.badge && (
                                <div
                                    className={cn(
                                        "absolute right-5 top-5 rounded-full px-3 py-1 text-xs font-bold",

                                        isRecommended &&
                                        "bg-green-600 text-white",

                                        isExclusive &&
                                        "bg-yellow-400 text-black"
                                    )}
                                >
                                    {pkg.badge}
                                </div>
                            )}

                            {/* Icon */}
                            <div
                                className={cn(
                                    "mb-5 flex h-14 w-14 items-center justify-center rounded-full",

                                    isExclusive
                                        ? "bg-yellow-100"
                                        : "bg-green-100"
                                )}
                            >
                                <MessageCircle
                                    className={cn(
                                        "h-7 w-7",

                                        isExclusive
                                            ? "text-yellow-600"
                                            : "text-green-600"
                                    )}
                                />
                            </div>

                            {/* Package */}
                            <h2 className="text-3xl font-bold text-gray-900">
                                {pkg.packageName}
                            </h2>

                            <p className="mt-3 min-h-[50px] text-gray-600">
                                {pkg.description}
                            </p>

                            {/* Price */}
                            <div
                                className={cn(
                                    "my-6 text-4xl font-extrabold",

                                    isExclusive
                                        ? "text-yellow-500"
                                        : "text-green-600"
                                )}
                            >
                                {pkg.price}
                            </div>

                            {/* Benefits */}
                            <ul className="mb-8 flex-1 space-y-3">
                                {pkg.benefits.map((benefit) => (
                                    <li
                                        key={benefit}
                                        className="flex items-start gap-2 text-gray-700"
                                    >
                                        <CheckCircle
                                            className={cn(
                                                "mt-0.5 h-5 w-5 shrink-0",

                                                isExclusive
                                                    ? "text-yellow-500"
                                                    : "text-green-500"
                                            )}
                                        />

                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Payment */}
                            <Button
                                onClick={() =>
                                    handlePayment(
                                        pkg.packageName,
                                        pkg.price
                                    )
                                }
                                className={cn(
                                    "w-full py-6 text-lg font-bold",

                                    isRecommended &&
                                    "bg-green-600 hover:bg-green-500",

                                    isExclusive &&
                                    "bg-yellow-400 text-black hover:bg-yellow-300",

                                    !pkg.badge &&
                                    "bg-gray-900 hover:bg-gray-800"
                                )}
                            >
                                <MessageCircle className="mr-2 h-5 w-5" />
                                Bayar lewat WhatsApp
                            </Button>
                        </div>
                    );
                })}
            </div>

            {/* Back */}
            <div className="mx-auto mt-8 max-w-7xl">
                <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali
                </Button>
            </div>
        </div>
    );
}
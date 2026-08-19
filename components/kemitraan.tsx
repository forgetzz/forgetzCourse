"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { cn } from "@/utils/utils";

const sokidPackages = [
  {
    title: "Advance",
    price: "Rp 170.000 / bulan",
    description:
      "Akses semua module, pembelajaran, dan materi advanced.",
    benefits: [
      "Semua Course Beginner",
      "Semua Course Mid-level",
      "AI Engineering",
      "RAG & LangChain",
      "MCP & AI Agent",
      "Advanced System Design",
      "Production Architecture",
      "Video Module",
      "Pertemuan 3x seminggu",
    ],
    badge: "EKSKLUSIF",
    onJoin: () => alert("Gabung sebagai SOKID ADVANCE"),
  },

  {
    title: "Mid-level",
    price: "Rp 125.000 / bulan",
    description:
      "Akses course programming dan pembelajaran tingkat menengah.",
    benefits: [
      "Semua Course Beginner",
      "React.js",
      "Next.js",
      "TypeScript Advanced",
      "Node.js",
      "Express.js",
      "REST API",
      "PostgreSQL",
      "Prisma",
      "Fullstack Web Development",
      "Video Module",
      "Pertemuan 1x seminggu",
    ],
    badge: "REKOMENDASI",
    onJoin: () => alert("Gabung sebagai SOKID MID-LEVEL"),
  },

  {
    title: "Beginner",
    price: "FREE",
    description:
      "Pelajari dasar pemrograman dan fundamental web development.",
    benefits: [
      "HTML & CSS Dasar",
      "JavaScript Fundamental",
      "Git & GitHub",
      "Video pembelajaran",
      "PDF / ebook",
      "Bangun Project Nyata",
      "Akses permanen",
    ],
    badge: "",
    onJoin: () => alert("Gabung sebagai SOKID BEGINNER"),
  },
];

export function SokidList() {
  return (
    <section id="kemitraan" className="py-10">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-center text-4xl font-extrabold leading-tight text-gray-800 sm:text-5xl">
          Pilihan Paket{" "}
          <span className="text-green-600">Belajar</span> Kami
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-gray-600 sm:text-xl">
          Pilih paket belajar sesuai kebutuhanmu, mulai dari fundamental
          programming hingga materi advanced. Belajar dengan pendekatan
          terstruktur, project nyata, dan materi yang dirancang untuk
          membantu kamu berkembang menjadi developer modern.
        </p>
      </div>

      {/* Pricing */}
      <div className="grid gap-8 md:grid-cols-3">
        {sokidPackages.map((pkg, i) => {
          const isExclusive = pkg.badge === "EKSKLUSIF";
          const isRecommended = pkg.badge === "REKOMENDASI";

          return (
            <div
              key={i}
              className={cn(
                "relative flex min-h-[420px] flex-col rounded-xl border-2 bg-white p-8 text-gray-800 shadow-xl transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-2xl",

                isExclusive &&
                "border-yellow-400 shadow-yellow-400/20",

                isRecommended &&
                "border-green-600 shadow-green-600/20",

                !pkg.badge &&
                "border-gray-200"
              )}
            >
              {/* Badge */}
              {pkg.badge && (
                <div
                  className={cn(
                    "absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold",
                    isExclusive &&
                    "bg-yellow-400 text-black",
                    isRecommended &&
                    "bg-green-600 text-white"
                  )}
                >
                  {pkg.badge}
                </div>
              )}

              <div className="flex flex-1 flex-col">
                {/* Title */}
                <div>
                  <h2 className="mb-2 text-4xl font-bold">
                    {pkg.title}
                  </h2>

                  <p className="mb-4 min-h-[56px] text-lg text-gray-600">
                    {pkg.description}
                  </p>

                  {/* Price */}
                  <div
                    className={cn(
                      "mb-6 text-4xl font-extrabold",
                      isExclusive
                        ? "text-yellow-500"
                        : "text-green-600"
                    )}
                  >
                    {pkg.price}
                  </div>
                </div>

                {/* Benefits */}
                <ul className="mb-8 space-y-3 text-base">
                  {pkg.benefits.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle
                        className={cn(
                          "mt-0.5 h-5 w-5 shrink-0",
                          isExclusive
                            ? "text-yellow-500"
                            : "text-green-500"
                        )}
                      />

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                {/* <Button
                  className={cn(
                    "mt-auto w-full py-6 text-lg font-bold",

                    isExclusive &&
                    "bg-yellow-400 text-black hover:bg-yellow-300",

                    isRecommended &&
                    "bg-green-600 text-white hover:bg-green-500",

                    !pkg.badge &&
                    "bg-gray-800 text-white hover:bg-gray-700"
                  )}
                  onClick={pkg.onJoin}
                >
                  Gabung Sekarang
                </Button> */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
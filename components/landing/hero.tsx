"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Zap, Users } from "lucide-react";


const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#050A05] text-white overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* <Image
          src="/images/as.jpg"
          alt="ASB Family Background"
          fill
          className="object-cover opacity-20"
          priority
        />  */}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74, 222, 128, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 222, 128, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(74,222,128,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Side accent lines */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-green-500/30 to-transparent z-0" />
      <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-green-500/30 to-transparent z-0" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">

        {/* Badge */}
        {/* <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/5 text-green-400 text-sm font-medium tracking-wide"
          style={{ animation: "fadeSlideDown 0.6s ease forwards" }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Platform Coding #1 Indonesia
        </div> */}

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6 mt-7"
          style={{
            animation: "fadeSlideUp 0.7s ease 0.1s both",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          <span className="block text-white">
            Learn to Build
          </span>

          <span
            className="block"
            style={{
              background:
                "linear-gradient(135deg, #4ade80 0%, #22c55e 40%, #86efac 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Real Things.
          </span>

          <span className="block text-white/90 text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
            From fundamentals to real-world development.
          </span>
        </h1>
        {/* Subheadline */}
        <p
          className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          style={{ animation: "fadeSlideUp 0.7s ease 0.25s both" }}
        >
          Kuasai skill coding yang dibutuhkan industri — dengan kurikulum terstruktur, mentor berpengalaman, dan komunitas aktif.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-16"
          style={{ animation: "fadeSlideUp 0.7s ease 0.35s both" }}
        >
          <Link href="/login">
            <button
              className="group relative flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-black overflow-hidden transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #4ade80, #22c55e)",
                boxShadow: "0 0 30px rgba(74, 222, 128, 0.35)",
              }}
            >
              <span className="relative z-10">Mulai Belajar</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              {/* Shimmer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
                }}
              />
            </button>
          </Link>

          <Link href="/signup">
            <button className="group flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm">
              Daftar Gratis
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        {/* Divider */}
        <div
          className="w-full max-w-md flex items-center gap-4 mb-10"
          style={{ animation: "fadeSlideUp 0.7s ease 0.45s both" }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-xs text-gray-600 tracking-widest uppercase">Statistik Platform</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* Stats */}

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{ background: "linear-gradient(to top, #050A05, transparent)" }} />

      {/* Animations */}
      <style jsx>{`
  

        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
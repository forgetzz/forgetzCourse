"use client";
import { FirebaseError } from "firebase/app";
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Code2, AlertCircle } from "lucide-react";
import Turnstile from "react-turnstile"
import { useAuth } from "@/hooks/useAuth";
import { SetAnalyticsUser, TrackEvent } from "@/lib/gtag";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lihatPassword, setLihatPassword] = useState(false);
  const [captcha, setCaptcha] = useState<string>()
  const router = useRouter();
  const { refreshUser } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          captcha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login gagal.");
      }

      // Pastikan session sudah terbaca
      const sessionResponse = await fetch("/api/me", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!sessionResponse.ok) {
        throw new Error("Session belum siap.");
      }

      const sessionData = await sessionResponse.json();

      if (!sessionData.user) {
        throw new Error("Session tidak valid.");
      }

      // Isi ulang AuthContext
      await refreshUser();

      //  userloginData 
      SetAnalyticsUser(username);

      TrackEvent("login", {
        method: "email",
        username: username,
      });
      // Baru masuk dashboard
      router.replace("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat login.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex bg-[#050A05]">

      {/* Left Panel — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 30% 20%, rgba(74,222,128,0.13) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="w-8 h-8 rounded-lg bg-green-400 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-black" strokeWidth={2.5} />
            </div>
            <span className="text-white font-black text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>
              Forget<span className="text-green-400">Studio</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/25 bg-green-500/8 text-green-400 text-xs font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Platform Coding #1 Indonesia
          </div>
          <h2
            className="text-5xl font-black leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span className="text-white">Selamat</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #86efac 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Datang Kembali
            </span>
          </h2>
          <p className="text-gray-500 text-base leading-relaxed max-w-xs">
            Masuk dan lanjutkan perjalanan belajar programming-mu bersama ribuan siswa lainnya.
          </p>
        </div>

        <div className="relative z-10 flex gap-8">
          {[["50+", "Courses"], ["12K+", "Students"], ["4.9★", "Rating"]].map(([val, label]) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-white font-black text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>{val}</span>
              <span className="text-gray-600 text-xs uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </div>

        {/* Vertical line accent */}
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-green-500/20 to-transparent" />
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-sm">

          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-10">
            <div className="w-7 h-7 rounded-lg bg-green-400 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-black" strokeWidth={2.5} />
            </div>
            <span className="text-white font-black text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
              Forgetz<span className="text-green-400">Studio</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-3xl font-black text-white mb-1"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Masuk
            </h1>
            <p className="text-gray-500 text-sm">Masukkan kredensial akun kamu</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 mb-6 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-400 text-sm leading-snug">{error}</p>
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Username kamu"
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.border = "1px solid rgba(74,222,128,0.4)";
                e.currentTarget.style.background = "rgba(74,222,128,0.04)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={lihatPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Password kamu"
                className="w-full px-4 py-3 pr-12 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(74,222,128,0.4)";
                  e.currentTarget.style.background = "rgba(74,222,128,0.04)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
              />
              <button
                type="button"
                onClick={() => setLihatPassword(!lihatPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors p-1"
                aria-label={lihatPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {lihatPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* ini captcha session */}
          <div className="relative z-50 overflow-visible">
            <Turnstile
              className="p-5 flex justify-center items-center mt-5"
              sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onVerify={(token) => {
                setCaptcha(token);
              }}
            />
          </div>
          {/* ini captcha session */}

          {/* Submit */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="group relative w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            style={{
              background: loading ? "#22c55e" : "linear-gradient(135deg, #4ade80, #22c55e)",
              boxShadow: "0 0 24px rgba(74,222,128,0.3)",
            }}
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-black" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Memuat...
              </>
            ) : (
              <>
                Masuk Sekarang
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/6" />
            <span className="text-gray-700 text-xs">atau</span>
            <div className="flex-1 h-px bg-white/6" />
          </div>

          <p className="text-center text-gray-600 text-sm">
            Belum punya akun?{" "}
            <Link href="/signup" className="text-green-400 font-semibold hover:text-green-300 transition-colors">
              Daftar gratis
            </Link>
          </p>
        </div>
      </div>

      {/* Font */}

    </div>
  );
}
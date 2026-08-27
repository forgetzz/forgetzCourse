"use client";

import React, { useEffect, useState } from "react";

import { db } from "@/lib/firebase";

import { Star, TrendingUp, Code2 } from "lucide-react";

import useTheme from "@/hooks/useTheme";

import { Colors } from "@/utils/Colors";

import { profileType } from "@/types";

import { useAuth } from "@/hooks/useAuth";

import Announcement from "../ui/annoucement";

import { Firebase } from "@/utils/firebase";

const MAX_ACCOUNT = 3;

export default function Home2() {
  const [profile, setProfile] = useState<profileType>();

  const { isDark } = useTheme();
  const { user, isLoading } = useAuth();

  const Isdarkbg = isDark
    ? Colors.Primary_BG
    : Colors.Secondary_BG;

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      alert("Login dulu");
      return;
    }

    const usersData = async () => {
      const fbs = new Firebase();

      const result = await fbs.getUser<profileType>(
        db,
        "users",
        user.uid
      );

      if (!result) {
        throw new Error("Data belum siap");
      }

      setProfile(result);
    };

    usersData();
  }, [user, isLoading]);

  const levelAccount = Number(profile?.levelAccount ?? 0);

  return (
    <div
      className="min-h-screen p-5 md:p-8 space-y-6 mb-20 home-enter"
      style={{
        background: Isdarkbg,
        fontFamily: "'', sans-serif",
      }}
    >
      {/* Welcome Header */}
      <div className="flex items-start justify-between home-item home-item-1">
        <div>
          <p className="text-xs uppercase tracking-widest mb-1">
            Dashboard
          </p>

          <h1 className="text-2xl md:text-3xl font-black leading-tight">
            Selamat Datang,{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #4ade80 0%, #22c55e 60%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {profile?.name ?? "—"}
            </span>
          </h1>

          <p className="text-sm mt-1">
            Pantau progres belajar dan pencapaianmu.
          </p>
        </div>

        {/* Avatar */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(74,222,128,0.1)",
            border: "1px solid rgba(74,222,128,0.2)",
          }}
        >
          <Code2
            className="w-5 h-5 text-green-400"
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Certificate Card */}
      <div
        className="rounded-2xl overflow-hidden relative home-item home-item-2"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(74,222,128,0.4), transparent)",
          }}
        />
      </div>

      {/* Task Card */}
      <div className="home-item home-item-3">
        <TaskCard
          icon={<TrendingUp className="w-4 h-4" />}
          title="Account Level"
          rating={levelAccount}
          max={MAX_ACCOUNT}
          color="#facc15"
          accentBg="rgba(250,204,21,0.08)"
          accentBorder="rgba(250,204,21,0.15)"
        />
      </div>

      {/* Announcement */}
      <div className="mt-10 md:mt-12 home-item home-item-4">
        <Announcement />
      </div>
    </div>
  );
}

/* ── Task detail card ── */

function TaskCard({
  icon,
  title,
  rating,
  max,
  color,
  accentBg,
  accentBorder,
}: {
  icon: React.ReactNode;
  title: string;
  rating: number;
  max: number;
  color: string;
  accentBg: string;
  accentBorder: string;
}) {
  const filled = Math.min(rating, max);

  // Jumlah star kosong
  const empty = max - filled;

  return (
    <div
      className="rounded-2xl p-5 relative overflow-hidden task-card-hover"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Glow accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 60% 50% at 0% 0%,
            ${accentBg} 0%,
            transparent 70%
          )`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: accentBg,
                border: `1px solid ${accentBorder}`,
              }}
            >
              {icon}
            </div>

            <span
              className="text-base font-bold"
              style={{
                fontFamily: "'Syne', sans-serif",
              }}
            >
              {title}
            </span>
          </div>

          <span
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.05)",
            }}
          >
            {filled}/{max} Level Account
          </span>
        </div>

        {/* Stars */}
        <div className="flex gap-2 mb-4">
          {Array.from({ length: filled }).map((_, i) => (
            <Star
              key={`f-${i}`}
              className="w-7 h-7 star-filled"
              style={{
                animationDelay: `${i * 100}ms`,
              }}
              fill={color}
              stroke="none"
            />
          ))}

          {Array.from({ length: empty }).map((_, i) => (
            <Star
              key={`e-${i}`}
              className="w-7 h-7"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
            />
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="h-1.5 rounded-full mb-1"
          style={{
            background: "rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="h-1.5 rounded-full progress-fill"
            style={{
              width: `${(filled / max) * 100}%`,
              background: color,
            }}
          />
        </div>

        <p className="mt-1 text-xs">
          {filled === 1
            ? "Account Beginner"
            : filled === 2
              ? "Account Pro"
              : filled === max
                ? "Account Advance"
                : "Account belum terdaftar"}
        </p>
      </div>
    </div>
  );
}
"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import { client } from "@/sanity/lib/client";

type AnnouncementType = {
  _id: string;
  title: string;
  description?: string;
  buttonText?: string;
  link?: string;
  imageUrl: string;
};

const announcementQuery = `*[
  _type == "announcement" &&
  active == true
] | order(_createdAt desc)[0] {
  _id,
  title,
  description,
  buttonText,
  link,
  "imageUrl": image.asset->url
}`;

export default function Announcement() {
  const [announcement, setAnnouncement] =
    useState<AnnouncementType | null>(null);

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getAnnouncement = async () => {
      try {
        const data = await client.fetch<AnnouncementType | null>(
          announcementQuery
        );

        setAnnouncement(data);
      } catch (error) {
        console.error("Gagal mengambil announcement:", error);
      } finally {
        setLoading(false);
      }
    };

    getAnnouncement();
  }, []);

  // Trigger animation setelah data tersedia
  useEffect(() => {
    if (!announcement) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [announcement]);

  if (loading) {
    return (
      <div className="relative h-[260px] w-full overflow-hidden rounded-3xl bg-muted">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted via-muted/60 to-muted" />

        <div className="absolute inset-0 flex flex-col justify-center p-8">
          <div className="h-4 w-28 animate-pulse rounded-full bg-muted-foreground/20" />

          <div className="mt-4 h-8 w-72 max-w-full animate-pulse rounded-lg bg-muted-foreground/20" />

          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded-full bg-muted-foreground/20" />
        </div>
      </div>
    );
  }

  if (!announcement) {
    return null;
  }

  return (
    <section
      className={`
        group relative overflow-hidden rounded-3xl
        border border-white/10
        bg-black
        shadow-xl
        transition-all duration-700 ease-out
        hover:shadow-2xl
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }
      `}
    >
      {/* Background Image */}

      <img
        src={announcement.imageUrl}
        alt={announcement.title}
        className="
          absolute inset-0
          h-full w-full
          object-cover
          scale-100
          transition-transform
          duration-[1800ms]
          ease-out
          group-hover:scale-105
        "
      />

      {/* Main Overlay */}

      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-black/90
          via-black/65
          to-black/20
        "
      />

      {/* Bottom readability */}

      <div
        className="
          absolute inset-x-0 bottom-0
          h-40
          bg-gradient-to-t
          from-black/70
          to-transparent
        "
      />

      {/* Decorative Glow */}

      <div
        className="
          absolute -right-24 -top-24
          h-72 w-72
          rounded-full
          bg-green-400/10
          blur-3xl
          transition-all
          duration-1000
          group-hover:bg-green-400/20
        "
      />

      {/* Content */}

      <div className="relative z-10 flex min-h-[260px] items-center p-6 sm:p-8 md:min-h-[300px] md:p-10">
        <div className="max-w-2xl">

          {/* Badge */}

          <div
            className={`
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/15
              bg-white/10
              px-3
              py-1.5
              text-xs
              font-medium
              text-white
              backdrop-blur-md

              transition-all
              duration-700
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }
            `}
            style={{
              transitionDelay: "100ms",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-green-400
                  opacity-60
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  h-2
                  w-2
                  rounded-full
                  bg-green-400
                "
              />
            </span>

            Featured
          </div>

          {/* Title */}

          <h2
            className={`
              text-3xl
              font-black
              leading-tight
              tracking-tight
              text-white
              sm:text-4xl
              md:text-5xl

              transition-all
              duration-700
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }
            `}
            style={{
              transitionDelay: "180ms",
            }}
          >
            {announcement.title}
          </h2>

          {/* Description */}

          {announcement.description && (
            <p
              className={`
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-white/75
                sm:text-base

                transition-all
                duration-700
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }
              `}
              style={{
                transitionDelay: "260ms",
              }}
            >
              {announcement.description}
            </p>
          )}

          {/* CTA */}

          {announcement.link && (
            <div
              className={`
                mt-6

                transition-all
                duration-700
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }
              `}
              style={{
                transitionDelay: "340ms",
              }}
            >
              <a
                href={announcement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group/button
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-black

                  shadow-lg
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:bg-white/90
                  hover:shadow-2xl
                "
              >
                <span>
                  {announcement.buttonText || "Lihat Selengkapnya"}
                </span>

                <ArrowRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover/button:translate-x-1
                  "
                />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Corner Decoration */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          h-32
          w-32
          rounded-tl-full
          bg-white/[0.03]
          transition-all
          duration-700
          group-hover:bg-white/[0.06]
        "
      />

      {/* Small sparkle */}

      <Sparkles
        className="
          pointer-events-none
          absolute
          right-6
          top-6
          h-5
          w-5
          text-white/30

          transition-all
          duration-700

          group-hover:rotate-12
          group-hover:text-white/60
        "
      />
    </section>
  );
}
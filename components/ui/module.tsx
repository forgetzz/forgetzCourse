"use client";

import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { TrackEvent } from "@/lib/gtag";
import { profileType } from "@/types";
import { Firebase } from "@/utils/firebase";
import React, { useEffect, useRef, useState } from "react";

export type PdfType = {
  _id: string;
  title: string;
  description?: string;
  fileUrl: string;
};

export type VideoType = {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
};

export type ModuleProps = {
  pdfs: PdfType[];
  videos: VideoType[];
  pdfLoading?: boolean;
  videoLoading?: boolean;
};

export default function Module({
  pdfs,
  videos,
  pdfLoading = false,
  videoLoading = false,
}: ModuleProps) {
  // Menyimpan progress yang sudah pernah dikirim
  const progressTracked = useRef<Record<string, Set<number>>>({});
  const [profile, setProfile] = useState<profileType | null>(null)
  const { user, isLoading } = useAuth()
  // handel video kirim ke gtags
  const handleVideoPlay = (video: VideoType) => {
    TrackEvent("video_start", {
      video_id: video._id,
      video_title: video.title,
    });
  };

  const handleVideoProgress = (
    event: React.SyntheticEvent<HTMLVideoElement>,
    video: VideoType
  ) => {
    const videoElement = event.currentTarget;

    if (!videoElement.duration) return;

    const progress =
      (videoElement.currentTime / videoElement.duration) * 100;

    const milestones = [25, 50, 75];

    // Buat Set untuk video ini jika belum ada
    if (!progressTracked.current[video._id]) {
      progressTracked.current[video._id] = new Set();
    }

    for (const milestone of milestones) {
      if (
        progress >= milestone &&
        !progressTracked.current[video._id].has(milestone)
      ) {
        progressTracked.current[video._id].add(milestone);

        TrackEvent("video_progress", {
          video_id: video._id,
          video_title: video.title,
          progress: milestone,
        });
      }
    }
  };

  const handleVideoEnded = (video: VideoType) => {
    TrackEvent("video_completed", {
      video_id: video._id,
      video_title: video.title,
    });
  };

  // Ini function untuk kirim data user gtag
  useEffect(() => {
    const getUser = async () => {
      if (!user) return

      try {
        const fbs = new Firebase()
        const result = await fbs.getUser<profileType>(db, "users", user.uid)
        setProfile(result)
      } catch {
        alert("HAHAHAHAHAHAHA KAMU ERORR,  KASIAN BANGET HAHAHHAA")
      }

    }

    getUser()
  }, [])


  // ini loading dari useAuth users 
  if (isLoading) {
    <div>
      <h1>LOADING DULU YEKAN </h1>
    </div>
  }

  return (
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ================= PDF ================= */}
        <div className=" flex justify-center items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm backdrop-blur-md mb-20">
          <span className="">User ID</span>

          <span className="font-medium ">
            {profile?.uid}
          </span>
        </div>
        <section>
          <div className="mb-6">
            <h1 className="text-xl font-bold  sm:text-2xl">
              Module Pembelajaran
            </h1>

            <p className="mt-1 text-sm ">
              Materi pembelajaran yang dapat kamu baca dan pelajari.
            </p>
          </div>

          {pdfLoading ? (
            <div className="py-10 text-center">
              <p className="text-sm ">Loading PDF...</p>
            </div>
          ) : pdfs.length === 0 ? (
            <div className="rounded-xl border border-dashed  py-10 text-center">
              <p className="text-sm ">
                Belum ada materi PDF.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pdfs.map((pdf) => (
                <article
                  key={pdf._id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200  shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* PDF Icon */}
                  <div className="flex h-36 items-center justify-center ">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl  text-3xl">
                      📄
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                      {pdf.title}
                    </h2>

                    {pdf.description ? (
                      <p className="mt-2 text-sm leading-6">
                        {pdf.description}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm ">
                        Tidak ada deskripsi materi.
                      </p>
                    )}

                    <button
                      onClick={() => {
                        TrackEvent("pdf_read", {
                          pdf_id: pdf._id,
                          pdf_title: pdf.title,
                        });

                        window.open(pdf.fileUrl, "_blank");
                      }}
                      className="mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-medium  transition hover:bg-gray-800 active:scale-[0.98]"
                    >
                      Lihat PDF
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ================= VIDEO ================= */}
        <section className="mt-14">
          <div className="mb-6">
            <h2 className="text-xl font-bold  sm:text-2xl">
              Video Pembelajaran
            </h2>

            <p className="mt-1 text-sm ">
              Video tutorial dan materi pembelajaran untuk membantu proses
              belajar.
            </p>
          </div>

          {videoLoading ? (
            <div className="py-10 text-center">
              <p className="text-sm text-gray-400">
                Loading video...
              </p>
            </div>
          ) : videos.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center">
              <p className="text-sm ">
                Belum ada video pembelajaran.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {videos.map((video) => (
                <article
                  key={video._id}
                  className="group overflow-hidden rounded-2xl border border-gray-200  shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Video */}
                  <div className="aspect-video w-full ">
                    <video
                      controlsList="nodownload"
                      controls
                      preload="metadata"
                      className="h-full w-full object-contain"
                      onPlay={() => handleVideoPlay(video)}
                      onTimeUpdate={(event) =>
                        handleVideoProgress(event, video)
                      }
                      onEnded={() => handleVideoEnded(video)}
                    >
                      <source
                        src={video.videoUrl}
                        type="video/mp4"
                      />

                      Browser kamu tidak mendukung video.
                    </video>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-base font-semibold leading-6 ">
                      {video.title}
                    </h3>

                    {video.description ? (
                      <p className="mt-2 text-sm leading-6">
                        {video.description}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm ">
                        Tidak ada deskripsi video.
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
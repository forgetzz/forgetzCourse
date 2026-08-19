"use client";

import React from "react";

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

type ModuleProps = {
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
  return (
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= PDF ================= */}

        <section>
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              📚 Module Pembelajaran
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Materi pembelajaran yang dapat kamu baca dan pelajari.
            </p>
          </div>

          {pdfLoading ? (
            <div className="py-10 text-center">
              <p className="text-sm text-gray-400">
                Loading PDF...
              </p>
            </div>
          ) : pdfs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center">
              <p className="text-sm text-gray-400">
                Belum ada materi PDF.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pdfs.map((pdf) => (
                <article
                  key={pdf._id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* PDF Icon */}

                  <div className="flex h-36 items-center justify-center bg-gray-50">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
                      📄
                    </div>
                  </div>

                  {/* Content */}

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                      {pdf.title}
                    </h2>

                    {pdf.description ? (
                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {pdf.description}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-gray-400">
                        Tidak ada deskripsi materi.
                      </p>
                    )}

                    <button
                      onClick={() => {
                        window.open(pdf.fileUrl, "_blank");
                      }}
                      className="mt-5 w-full rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-[0.98]"
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
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              🎥 Video Pembelajaran
            </h2>

            <p className="mt-1 text-sm text-gray-500">
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
              <p className="text-sm text-gray-400">
                Belum ada video pembelajaran.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {videos.map((video) => (
                <article
                  key={video._id}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Video */}

                  <div className="aspect-video w-full bg-black">
                    <video
                      controlsList="nodownload"
                      controls
                      preload="metadata"
                      className="h-full w-full object-contain"
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
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      {video.title}
                    </h3>

                    {video.description ? (
                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {video.description}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-gray-400">
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
import React from "react";
import Image from "next/image";

export default function SejarahKami() {
  return (
    <div id="tentangKami" className="w-full">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-10 px-6 text-center">
        <h1 className="text-3xl font-bold">ForgetzStudio</h1>
        <p className="text-lg mt-2">
          Membangun Pendidikan yang bersifat egaliter
        </p>
      </div>

      {/* Gambar dan Konten Berdampingan */}
      <div className="flex flex-wrap md:flex-nowrap bg-white p-6 items-center gap-6">
        {/* Gambar */}

        <div className="relative w-full md:w-1/3 aspect-video px-1">
          <Image
            src="/images/forget.png"
            alt="Quantum Background"
            fill
            className="object-contain rounded"
            priority
          />
        </div>


        {/* Teks */}
        <div className="w-full md:w-1/2 text-black">
          <p className="text-justify">
            Forget Studio Learn hadir sebagai platform pembelajaran programming
            untuk membantu siapa saja belajar coding dari nol hingga tingkat
            advanced. Kami percaya bahwa teknologi bukan hanya untuk programmer
            berpengalaman, tetapi juga untuk pemula yang ingin memulai perjalanan
            di dunia digital. Mulai dari memahami logika dasar pemrograman,
            frontend, backend, database, hingga membangun project nyata, semua
            materi dirancang agar mudah dipahami dan dapat diterapkan langsung.
            Tujuan kami adalah membantu setiap learner membangun skill yang
            relevan dengan industri modern, sehingga tidak hanya belajar teori,
            tetapi juga mampu menciptakan aplikasi dan solusi teknologi nyata.
          </p>
        </div>
      </div>
    </div>
  );
}

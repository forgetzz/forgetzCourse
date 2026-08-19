// components/Footer.tsx
import React from "react";
import { FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer id="kontak" className="bg-gradient-to-br from-[#22c55e] to-[#15803d]text-white pt-12 pb-6 mt-16 shadow-inner shadow-black/0">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Deskripsi */}
        <div className="space-y-3">
          <Image
            src="/images/forget.png"
            alt="forget studio"
            width={200}
            height={200}
            className="object-contain max-h-60 rounded-lg"
            priority
          />
          <p className="text-sm text-black">
           Forget Studio
          </p>
        </div>

        {/* Admin Kontak */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold underline underline-offset-4 decoration-white/40">
            Admin Kontak
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaWhatsapp className="text-green-400" />

              <a href="https://wa.link/cs8w3m"> 089602203266</a>
            </li>
         
          </ul>
        </div>

        {/* Lokasi & Map */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FaMapMarkerAlt className="text-yellow-300" />
            Alamat Kami
          </h3>
          <p className="text-sm text-black">
            Makassar, sulawesi selatan , indonesia
          </p>
          <div className="rounded-xl overflow-hidden border border-white/30 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.99550508894!2d119.5341459!3d-5.1044221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbefb831617eb09%3A0xb1d71384ca5f90c7!2sforgetz%20studio!5e0!3m2!1sid!2sid!4v1779184135612!5m2!1sid!2sid" 
              width="100%"
              height="180"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Quotes / Slogan */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">🚀 Visi Kami</h3>
          <p className="text-sm italic text-black">
            Belajar bersama tim kami
          </p>
        </div>
      </div>

      {/* Footer bottom */}
      <p className="border-t border-white/20 mt-10 pt-4 text-center text-sm text-black">
        © {new Date().getFullYear()}{" "}
        <strong className="text-black">Forget Studio</strong>. All rights reserved.
      </p>

    </footer>
  );
}

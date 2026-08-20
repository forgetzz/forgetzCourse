"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function GlobalLoading() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // delay-nya bisa kamu sesuaikan

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-red-950/80 z-[9999] flex flex-col-reverse items-center justify-center">
      <div className="w-[120px] h-[120px] animate-spin-slow">

        <Image
          priority
          src="/images/forget.png"
          alt="Loading"
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
        <h1>

        </h1>
      </div>

    </div>
  );
}

"use client"
import Footer from "@/components/landing/footer";
import HeroSection from "@/components/landing/hero";
import { SokidList } from "@/components/landing/kemitraan"; // Assuming this is correct
import Navbar from "@/components/landing/navbar";
import Pengguna from "@/components/landing/pengguna";

import SejarahKami from "@/components/landing/sejarahKami";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const { user, isLoading } = useAuth();
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading]);


  return (
   
    <div className="bg-gray-50 min-h-screen">
      <Navbar /> 

      <main> 
  
        <HeroSection />

    
        <div className="mt-16"> 
          <Pengguna />
        </div>

        <div className="mt-16 px-1">
          <SejarahKami />
        </div>

        {/* <div className="mt-16 px-5 border-red-400"> 
          <ProductCards />
        </div> */}

        <div className="mt-16 px-10">
          <SokidList />
        </div>
      </main>

      <Footer /> {/* Footer also typically has its own styling */}
    </div>
  );
}
"use client";
import {
  Sheet,
  SheetContent,
  SheetTitle,

} from "@/components/ui/sheet";
import {


  Sun,
  ChevronDown,
  ChevronRight,
  Code2,
  FileCode,
  Smartphone,
  Puzzle,
} from "lucide-react";



import { useTabStore } from "@/store/tabStore";
import { useEffect, useState } from "react";
import { TabKey } from "@/constants/Tabkey";
import { tabStrategies } from "@/constants/Tabkey";
import { useAuth } from "@/hooks/useAuth";
import { formatTanggalIndonesia } from "@/utils/date";
import { FaAlignCenter, FaAlignJustify, FaBookReader, FaCashRegister, FaFolderMinus, FaHome, FaMoneyBill, FaMoneyBillWave, FaMoneyCheck, FaPaypal, FaQrcode, FaUserCircle } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { profileType } from "@/types";

export default function BottomNav() {
  const { activeTab, setActiveTab } = useTabStore();
  const [open, setOpen] = useState(false);
  const [openNested, setOpenNested] = useState(false)
  const [openNested2, setOpenNested2] = useState(false)
  const [openNested3, setOpenNested3] = useState(false)
  const [openNested4, setOpenNested4] = useState(false)
  const { user, isLoading } = useAuth()
  const [profile , setProfile] = useState<profileType>() 

  const now = new Date();


  const renderContent = (activeTab: TabKey) => {
    return tabStrategies[activeTab];

  };
   
useEffect(() => {
    if (isLoading) return;

    if (!user) {
        alert("Login dulu");
        return;
    }

    const getProfile = async () => {
        try {
            const snap = await getDoc(
                doc(db, "users", user.uid)
            );

            if (!snap.exists()) {
                alert("Data anda belum ada.");
                return;
            }

            setProfile(snap.data() as profileType);
        } catch (error) {
            console.error("Kesalahan pada data anda:", error);
        }
    };

    getProfile();
}, [user, isLoading]);


  const navItems = [
    { key: "Payment", icon: <FaMoneyBillWave size={22} /> },
    { key: "home", icon: <div className="bg-green-500 p-2 text-white rounded-full"><FaHome size={22} /></div> },
    { key: "Html", icon: <FaBookReader size={22} /> },
    { key: "settings", icon: <FaUserCircle size={22} /> },
  ] as const;

  return (
    <div className="flex flex-col min-h-fit bg-gray-50">
      <div className="flex justify-between items-center bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-b-lg px-4 py-3 text-white shadow-md">
        {/* Kiri: Hari + Halo */}
        <div>
          <p className="text-xs capitalize opacity-90">{formatTanggalIndonesia(now)}</p>
          {profile ? (
            <h1 className=" font-semibold">{profile.name}</h1>
          ) : (
            <p>loading...</p>
          )}
        </div>

        {/* Kanan: Bell + Avatar */}
        <div className="flex items-center gap-3">
          {/* Icon Notifikasi */}
          <div className="p-2 bg-white/10 rounded-full">
            <Sun size={20} />
          </div>

          {/* Avatar / Logo */}
          {/* <img
            src={profile?.imageProfile} // fallback jika kosong
            alt="Avatar"
            width={40} // ukuran lebih pas
            height={40}
            className="rounded-full border border-gray-300 shadow-sm object-cover"
          /> */}
        </div>
      </div>
      <main className="flex-1">{renderContent(activeTab)}</main>

      {/* Side menu with Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-64 bg-green-800 text-white p-0 h-screen overflow-y-auto  scrollbar-none"
        >
          <div className="p-4 ">
            <SheetTitle className="text-lg flex justify-center border-b-2 pb-4 border-white text-white items-center font-bold mb-4">
              Menu Utama
            </SheetTitle>
            <button
              className="w-full flex items-center gap-2 px-2 py-2 hover:bg-white/10 rounded mt-2"
              onClick={() => {
                setActiveTab("home");
                setOpen(false);
              }}
            >
              <FaFolderMinus size={18} />
              Dashboard
            </button>






            <div>
              {/* Menu lainnya */}

              {/* Parent item with toggle */}
              <button
                onClick={() => setOpenNested((prev) => !prev)}
                className="w-full flex items-center justify-between text-left px-2 py-2 hover:bg-white/10 rounded"
              >
                <span className="flex items-center gap-2">
                  <Code2 size={18} />
                  <span>Languange</span>
                </span>
                {openNested ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {/* Children (nested items) */}
              {openNested && (
                <div className="ml-6 mt-1 space-y-1">
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                      setOpen(false);
                    }}
                  >
                    Html
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                  Css
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                    Javascipt
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                   Solidity
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                    Typescript
                  </button>
               
                </div>
              )}
            </div>

            <div>
              {/* Menu lainnya */}

              {/* Parent item with toggle */}
              <button
                onClick={() => setOpenNested2((prev) => !prev)}
                className="w-full flex items-center justify-between text-left px-2 py-2 hover:bg-white/10 rounded"
              >
                <span className="flex items-center gap-2">
                  <FileCode size={18} />
                  <span>Framework</span>
                </span>
                {openNested2 ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {/* Children (nested items) */}
              {openNested2 && (
                <div className="ml-6 mt-1 space-y-1">
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                      setOpen(false);
                    }}
                  >
                    Next js
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                  React + Vite
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                    Sveltekit
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                    Vue
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                    Nuxtjs
                  </button>
               
                </div>
              )}
            </div>

            <div>
              {/* Menu lainnya */}

              {/* Parent item with toggle */}
              <button
                onClick={() => setOpenNested3((prev) => !prev)}
                className="w-full flex items-center justify-between text-left px-2 py-2 hover:bg-white/10 rounded"
              >
                <span className="flex items-center gap-2">
                  <Smartphone size={18} />
                  <span>Mobile</span>
                </span>
                {openNested3 ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {/* Children (nested items) */}
              {openNested3 && (
                <div className="ml-6 mt-1 space-y-1">
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                      setOpen(false);
                    }}
                  >
                    React Native + Expo
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                  Kotlin
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                    Flutter
                  </button>
                </div>
              )}
            </div>

            <div>
              {/* Menu lainnya */}

              {/* Parent item with toggle */}
              <button
                onClick={() => setOpenNested4((prev) => !prev)}
                className="w-full flex items-center justify-between text-left px-2 py-2 hover:bg-white/10 rounded"
              >
                <span className="flex items-center gap-2">
                  <Puzzle size={18} />
                  <span>Tools</span>
                </span>
                {openNested4 ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {/* Children (nested items) */}
              {openNested4 && (
                <div className="ml-6 mt-1 space-y-1">
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                      setOpen(false);
                    }}
                  >
                    Next js
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                  React + Vite
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                    Sveltekit
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                    Vue
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                    Nuxtjs
                  </button>
                  <button
                    className="block text-sm px-2 py-1 hover:bg-white/10 rounded w-full text-left"
                    onClick={() => {
                      setActiveTab("Html");
                    }}
                  >
                    NextAuth
                  </button>
               
                </div>
              )}
            </div>

           

          </div>
        </SheetContent>


        <nav className="fixed bottom-1 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg px-8 py-4  flex justify-between gap-8 w-[100%] max-w-md z-50">

          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-full transition-all duration-200 text-gray-500"
          >
            <FaAlignCenter size={22} />
          </button>


          {navItems.map(({ key, icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`p-2 rounded-full transition-all duration-200 ${activeTab === key ? " " : "text-gray-500"
                }`}
            >
              {icon}
            </button>
          ))}
        </nav>
      </Sheet>

    </div>
  );
}

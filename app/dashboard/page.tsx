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
  Moon,
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
import { TrackEvent } from "@/lib/gtag";
import useTheme from "@/hooks/useTheme";
import { Colors } from "@/utils/Colors";
import { cn } from "@/utils/cn";
import { menuGroups } from "@/constants/menu";

const navItems = [
  { key: "Payment", icon: <FaMoneyBillWave size={22} /> },
  { key: "home", icon: <div className="bg-green-500 p-2 text-white rounded-full"><FaHome size={22} /></div> },
  { key: "web3", icon: <FaBookReader size={22} /> },
  { key: "settings", icon: <FaUserCircle size={22} /> },
] as const;

export default function BottomNav() {
  const activeTab = useTabStore((state) => state.activeTab);
  const setActiveTab = useTabStore((state) => state.setActiveTab);


  const [open, setOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { user, isLoading } = useAuth()
  const [profile, setProfile] = useState<profileType>()
  const { ThemeToggle, isDark } = useTheme()
  const now = new Date();

  const theme = isDark ? Colors.Primary_BG : Colors.Secondary_BG
  const themeNavBottom = isDark ? Colors.NavBotttomPrimary_BG : Colors.NavBotttomSecondry_BG

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



  return (
    <div className={cn(
      // mix Styles
      "flex flex-col min-h-fit",

      theme
    )}>
      <div className={cn(
        // flexbox
        "flex justify-between items-center",
        // custom
        "text-white shadow-md",
        //  padding 
        "px-4 py-3",
        // background
        "bg-gradient-to-br from-green-950 via-emerald-900 to-green-800"
        //  theme 
      )}>

        <div>
          <p className="text-xs capitalize opacity-90">{formatTanggalIndonesia(now)}</p>
          {profile ? (
            <h1 className=" font-semibold">{profile.name}</h1>
          ) : (
            <p>loading...</p>
          )}
        </div>

        <div className="flex items-center">
          <button
            onClick={ThemeToggle}
            className={cn(
              "group flex items-center gap-2",
              "px-1 py-1",
              "text-sm font-medium",
              " ",
              "transition-colors duration-300"
            )}
          >
            <span
              key={isDark ? "dark" : "light"}
              className="animate-in spin-in-90 zoom-in-75 duration-300"
            >
              {isDark ? <Sun size={19} /> : <Moon size={19} />}
            </span>

            <span className="transition-all duration-300">
              {isDark ? "Light" : "Dark"}
            </span>
          </button>
        </div>

      </div>
      <main className={`flex-1 ${theme}`}>{renderContent(activeTab)}</main>

      {/* Side menu with Sheet */}

      <Sheet
        open={open}
        onOpenChange={setOpen}
      >

        <SheetContent
          side="left"
          className={cn(
            "w-64",
            "text-white",
            "p-0",
            "h-screen",
            "overflow-y-auto",
            "scrollbar-none",
            "bg-gradient-to-br from-green-950 via-emerald-900 to-green-800"
          )}
        >

          <div className="p-4">

            <SheetTitle
              className={cn(
                "text-lg",
                "flex",
                "justify-center",
                "items-center",
                "font-bold",
                "mb-4",
                "pb-4",
                "border-b-2",
                "border-white",
                "text-white"
              )}
            >
              Menu Utama
            </SheetTitle>


            <button
              type="button"
              className="
                w-full
                flex
                items-center
                gap-2
                px-2
                py-2
                hover:bg-white/10
                rounded
                mt-2
              "
              onClick={() => {

                setActiveTab("home");
                setOpen(false);

                setOpenMenu(null);

              }}
            >

              <FaFolderMinus size={18} />

              Dashboard

            </button>


            <div className="mt-2">

              {menuGroups.map((group) => {

                const Icon = group.icon;

                const isOpen =
                  openMenu === group.id;


                return (

                  <div
                    key={group.id}
                    className="mt-1"
                  >

                    {/* GROUP BUTTON */}

                    <button
                      type="button"

                      onClick={() => {

                        setOpenMenu(
                          isOpen
                            ? null
                            : group.id
                        );

                      }}

                      className="
                        w-full
                        flex
                        items-center
                        justify-between
                        text-left
                        px-2
                        py-2
                        hover:bg-white/10
                        rounded
                      "
                    >

                      <span className="flex items-center gap-2">

                        <Icon size={18} />

                        <span>
                          {group.label}
                        </span>

                      </span>


                      {isOpen ? (

                        <ChevronDown
                          size={18}
                        />

                      ) : (

                        <ChevronRight
                          size={18}
                        />

                      )}

                    </button>


                    {/* CHILDREN */}

                    {isOpen && (

                      <div
                        className="
                          ml-6
                          mt-1
                          space-y-1
                        "
                      >

                        {group.items.map(
                          (item) => (

                            <button
                              key={item.label}
                              type="button"

                              className="
                                block
                                text-sm
                                px-2
                                py-1
                                hover:bg-white/10
                                rounded
                                w-full
                                text-left
                              "

                              onClick={() => {

                                setActiveTab(
                                  item.tab
                                );

                                setOpen(false);

                                setOpenMenu(null);

                              }}
                            >

                              {item.label}

                            </button>

                          )
                        )}

                      </div>

                    )}

                  </div>

                );

              })}

            </div>

          </div>

        </SheetContent>



        <nav
          className={cn(
            "flex",
            "justify-between",
            "gap-8",
            "w-full",
            "max-w-md",
            "z-50",

            "backdrop-blur-md",
            "border",
            "border-gray-200",
            "rounded-2xl",
            "shadow-lg",
            "px-8",
            "py-4",

            "fixed",
            "bottom-1",
            "left-1/2",
            "-translate-x-1/2",

            themeNavBottom
          )}
        >

          {/* MENU BUTTON */}

          <button
            type="button"

            onClick={() => {

              setOpen(true);

              TrackEvent(
                "align_button",
                {
                  username: user?.username,
                }
              );

            }}

            className="
              p-2
              rounded-full
              transition-all
              duration-200
              text-gray-500
            "
          >

            <FaAlignCenter
              size={22}
            />

          </button>


          {/* NAV ITEMS */}

          {navItems.map(
            ({ key, icon }) => (

              <button
                key={key}
                type="button"

                onClick={() =>
                  setActiveTab(key)
                }

                className={cn(
                  "p-2",
                  "rounded-full",
                  "transition-all",
                  "duration-200",

                  activeTab === key
                    ? "text-green-500"
                    : "text-gray-500"
                )}
              >

                {icon}

              </button>

            )
          )}

        </nav>

      </Sheet>

    </div>
  );
}

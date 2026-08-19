import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../global.css";
import GlobalLoading from "@/components/loadingPage";
import { AuthContextProvider } from "@/context/authContext";
import { ThemeContextProvider } from "@/context/ThemeContext";
import NavbarAdmin from "@/components/layoutComponents/NavbarAdmin";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quantum Bootcamp",
  description: "sehat bersama",
  icons: {
    icon: "/images/loadinag.png", // atau /favicon.png
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        {/* Favicon manual */}
        <link rel="icon" href="/images/loading.png" type="image/png" />
        <title>Quantum Bootcamp</title>
      </head>
      <AuthContextProvider>
        <ThemeContextProvider>
          <body className="bg-base-100 text-base-content min-h-screen">
            <NavbarAdmin/>
            <GlobalLoading />
            {children}
          </body>
        </ThemeContextProvider>
      </AuthContextProvider>

    </html>
  );
}

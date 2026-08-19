import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import GlobalLoading from "@/components/loadingPage";
import { AuthContextProvider } from "@/context/authContext";
import { ThemeContextProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forgetzstudio",
  description: "belajar bersama",
  icons: {
    icon: "/images/forget.png", // atau /favicon.png
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

      <body className="bg-base-100 text-base-content min-h-screen">

        <AuthContextProvider>
          <ThemeContextProvider>
            <GlobalLoading />
            {children}
          </ThemeContextProvider>
        </AuthContextProvider>
      </body>


    </html >
  );
}

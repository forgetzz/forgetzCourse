import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import GlobalLoading from "@/components/landing/loadingPage";
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
  title: {
    default: "Forgetzstudio Learn",
    template: "%s | Forgetzstudio Learn",
  },

  description:
    "Forgetzstudio Learn adalah platform belajar programming dan teknologi untuk membantu kamu memahami coding dari dasar hingga membangun project nyata.",

  keywords: [
    "Forgetzstudio",
    "Forgetzstudio Learn",
    "belajar coding",
    "belajar programming",
    "belajar web development",
    "belajar Next.js",
    "belajar React",
    "belajar TypeScript",
  ],

  authors: [
    {
      name: "Forgetzstudio",
      url: "https://forgetzstudio.com",
    },
  ],

  creator: "Forgetzstudio",

  metadataBase: new URL("https://class.forgetzstudio.com"),

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/images/forget.png",
  },

  openGraph: {
    title: "Forgetzstudio Learn",
    description:
      "Belajar programming dan teknologi dengan materi yang praktis dan project nyata.",
    url: "https://class.forgetzstudio.com",
    siteName: "Forgetzstudio Learn",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Forgetzstudio Learn",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Forgetzstudio Learn",
    description:
      "Belajar programming dan teknologi dengan materi yang praktis dan project nyata.",
    images: ["/images/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
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
        <title>ForgetzStudio</title>
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

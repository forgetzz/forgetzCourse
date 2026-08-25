"use client";

import React, { useEffect, useState } from "react";


import { client } from "@/sanity/lib/client";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { profileType } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils/utils";
import Module, { PdfType, VideoType } from "@/components/ui/module";



const pdfQuery = `*[_type == "pdfnextJs"] | order(_createdAt asc) {
  _id,
  title,
  description,
  "fileUrl": file.asset->url
}`;

const videoQuery = `*[_type == "vidTs"] | order(_createdAt asc) {
  _id,
  title,
  description,
  level,
  videoUrl
}`;
export default function TypescriptModule() {
    const [pdfs, setPdfs] = useState<PdfType[]>([]);
    const [videos, setVideos] = useState<VideoType[]>([]);
    const [profile, setProfile] = useState<profileType>();
    const [profileLoading, setProfileLoading] = useState(true);
    const [moduleLoading, setModuleLoading] = useState(true);
    const user = useAuth()
    const userId = user.user?.uid

    useEffect(() => {
        if (!userId) {
            setProfileLoading(false);
            return;
        }

        const getUser = async () => {
            try {
                const dbRef = await getDoc(
                    doc(db, "users", userId)
                );

                if (!dbRef.exists()) {
                    return;
                }

                const response = dbRef.data() as profileType;

                setProfile(response);
            } catch (error) {
                console.error("Gagal mengambil profile:", error);
            } finally {
                setProfileLoading(false);
            }
        };

        getUser();
    }, [userId]);

    useEffect(() => {
        async function getData() {
            try {
                const [pdfData, videoData] = await Promise.all([
                    client.fetch<PdfType[]>(pdfQuery),
                    client.fetch<VideoType[]>(videoQuery),
                ]);

                setPdfs(pdfData);
                setVideos(videoData);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            } finally {
                setModuleLoading(false);
            }
        }

        getData();
    }, []);

    if (profileLoading || moduleLoading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />

                <div className="text-center">
                    <h1 className="text-lg font-semibold tracking-tight">
                        Loading data
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Please wait a moment...
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className={cn(
            "mb-32"
        )}>
            {(profile?.levelAccount ?? 0) > 0 ? (
                <Module
                    pdfs={pdfs}
                    videos={videos}
                    pdfLoading={moduleLoading}
                    videoLoading={moduleLoading}
                />
            ) : (
                <div className="flex min-h-screen items-center justify-center bg-background px-6">
                    <div className="w-full max-w-lg rounded-2xl border border-border bg-card/60 p-10 text-center shadow-xl backdrop-blur-xl">
                        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                            <span className="text-2xl">!</span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            AKUN ANDA BELUM MEMILIKI AKSES
                        </h1>

                        <p className="mt-4 text-sm leading-6 text-muted-foreground">
                            Anda belum memiliki izin untuk mengakses halaman ini.
                            Hubungi administrator untuk mendapatkan akses.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
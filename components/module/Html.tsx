"use client";

import React, { useEffect, useState } from "react";
import Module, {
    PdfType,
    VideoType,
} from "../ui/module";

import { client } from "@/sanity/lib/client";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "lucide-react";
import { getAuth } from "firebase/auth";
import { profileType } from "@/types";
import { useAuth } from "@/hooks/useAuth";



const pdfQuery = `*[_type == "pdfHtml"]{
  _id,
  title,
  description,
  "fileUrl": file.asset->url
}`;

const videoQuery = `*[_type == "vidHtml"]{
  _id,
  title,
  description,
  videoUrl
}`;

export default function HtmlModule() {
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
            <h1 className="flex min-h-screen items-center justify-center text-4xl">
                LOADING DATA......
            </h1>
        );
    }
    return (
        <>
            {(profile?.levelAccount ?? 0) > 0 ? (
                <Module
                    pdfs={pdfs}
                    videos={videos}
                    pdfLoading={moduleLoading}
                    videoLoading={moduleLoading}
                />
            ) : (
                <h1 className="flex min-h-screen items-center justify-center text-4xl">
                    AKUN ANDA BELUM MEMILIKI AKSES
                </h1>
            )}
        </>
    );
}
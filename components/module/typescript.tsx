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



const pdfQuery = `*[_type == "pdf"]{
  _id,
  title,
  description,
  "fileUrl": file.asset->url
}`;

const videoQuery = `*[_type == "video"]{
  _id,
  title,
  description,
  videoUrl
}`;

export default function Typescript() {
  const [pdfs, setPdfs] = useState<PdfType[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [profile, setProfile] = useState<profileType>()
  const [loading, setLoading] = useState(true);
  const user = useAuth()
  const userId = user.user?.uid

  useEffect(() => {
    if (!userId) return
    const getUser = async () => {
      const dbRef = await getDoc(doc(db, "users", userId))

      if (!dbRef.exists()) {
        return
      }

      const response = dbRef.data() as profileType

      setProfile(response)

    }

    getUser()
  }, [])

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
        setLoading(false);
      }
    }



    getData();
  }, []);


  if (loading) {
    return (
      <h1>LOADING DATA ......</h1>
    )
  }
  return (
    <>
      <div>{profile?.levelAccount === 1 ? <Module
        pdfs={pdfs}
        videos={videos}
        pdfLoading={loading}
        videoLoading={loading}
      /> : <h1 className=" min-h-screen flex justify-center items-center text-4xl">AKUN ANDA BELUM PRO MAS.. KASIAN BANGET :( HIKSSS...</h1>}</div>
    </>
  );
}
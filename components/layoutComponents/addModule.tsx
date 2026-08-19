"use client";

import { useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function AddModule() {
  const [file, setFile] = useState<File | null>(null);

  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [fileType, setFileType] = useState("");

  async function uploadFile() {
    if (!file) {
      alert("No file selected");
      return;
    }

    if (!title || !description || !thumbnail) {
      alert("Lengkapi semua field");
      return;
    }

    try {
      setUploading(true);

      // form data
      const formData = new FormData();
      formData.append("file", file);

      // upload api
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload gagal");
      }

      // result
      const result = await response.json();

      // save firestore
      await addDoc(collection(db, "modules"), {
        title,
        description,
        thumbnail,
        fileUrl: result.url,
        createdAt: serverTimestamp(),
      });

      // preview
      setUrl(result.url);

      // reset form
      setTitle("");
      setDescription("");
      setThumbnail("");
      setFile(null);

      alert("Upload berhasil");

    } catch (error) {
      console.log(error);
      alert("Trouble uploading file");
    } finally {
      setUploading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

        {/* header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Upload Module
          </h1>

          <p className="text-zinc-400 mt-2">
            Upload file ke Pinata lalu simpan metadata
            ke Firestore. Infrastruktur cloud modern
            demi mengunggah PDF. Perjalanan teknologi
            memang penuh plot twist.
          </p>
        </div>

        <div className="space-y-5">

          {/* title */}
          <div>
            <label className="text-sm text-zinc-300 block mb-2">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Belajar Blockchain"
              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          {/* description */}
          <div>
            <label className="text-sm text-zinc-300 block mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Fundamental blockchain..."
              className="
                w-full
                h-32
                resize-none
                bg-zinc-800
                border
                border-zinc-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          {/* thumbnail */}
          <div>
            <label className="text-sm text-zinc-300 block mb-2">
              Thumbnail URL
            </label>

            <input
              type="text"
              value={thumbnail}
              onChange={(e) =>
                setThumbnail(e.target.value)
              }
              placeholder="https://..."
              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          {/* thumbnail preview */}
          {thumbnail && (
            <img
              src={thumbnail}
              alt="thumbnail"
              className="
                w-full
                h-52
                object-cover
                rounded-2xl
                border
                border-zinc-800
              "
            />
          )}

          {/* upload */}
          <div>
            <label className="text-sm text-zinc-300 block mb-2">
              Upload File
            </label>

            <label
              className="
                flex
                flex-col
                items-center
                justify-center
                border-2
                border-dashed
                border-zinc-700
                rounded-2xl
                p-10
                cursor-pointer
                hover:border-blue-500
                transition
                bg-zinc-800/40
              "
            >
              <p className="text-zinc-300 font-medium">
                Click to upload
              </p>

              <p className="text-zinc-500 text-sm mt-1">
                PDF, image, document, anything binary.
              </p>

              {file && (
                <p className="text-blue-400 text-sm mt-3">
                  {file.name}
                </p>
              )}

              <input
                type="file"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          {/* preview */}
          {url && (
            <div className="mt-6">

              {fileType === "application/pdf" ? (
                <iframe
                  src={url}
                  className="
                    w-full
                    h-[500px]
                    rounded-2xl
                    border
                    border-zinc-800
                    bg-white
                  "
                />
              ) : (
                <img
                  src={url}
                  alt="preview"
                  className="
                    w-full
                    h-64
                    object-cover
                    rounded-2xl
                    border
                    border-zinc-800
                  "
                />
              )}

            </div>
          )}

          {/* button */}
          <button
            type="button"
            disabled={uploading}
            onClick={uploadFile}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              disabled:opacity-50
              disabled:cursor-not-allowed
              text-white
              font-semibold
              py-3
              rounded-xl
              transition
            "
          >
            {uploading
              ? "Uploading..."
              : "Upload Module"}
          </button>

        </div>
      </div>
    </main>
  );
}
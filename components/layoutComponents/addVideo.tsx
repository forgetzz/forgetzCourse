"use client";

import { useEffect, useState } from "react";

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
    Gift,
    Trash2,
    Plus,
    Package,
    GiftIcon,
} from "lucide-react";




export default function Video() {

    const [ProductName, setProductName] =
        useState("");

    const [ProductDesc, setProductDesc] =
        useState("");

    const [ProductTotal, setProductTotal] =
        useState(0);

    const [urlImage, setUrlImage] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [video, setVideo] = useState<
        CourseVideo[]
    >([]);

    // fetch data
    async function fetchGift() {
        try {

            const snapshot = await getDocs(
                collection(db, "Gift")
            );

            const result = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as CourseVideo[];

            setVideo(result);

        } catch (error) {
            console.log(error);
        }
    }

    // add gift
    async function addGift() {

        if (
            !ProductName ||
            !ProductDesc ||
            !urlImage
        ) {
            alert("Lengkapi semua field");
            return;
        }

        try {

            setLoading(true);

            await addDoc(collection(db, "Video"), {
                ProductDesc,
                ProductName,
                ProductTotal,
                urlImage,
            });

            // reset form
            setProductName("");
            setProductDesc("");
            setProductTotal(0);
            setUrlImage("");

            // refresh data
            fetchGift();

            alert("Berhasil tambah gift");

        } catch (error) {

            console.log(error);

            alert("Gagal tambah gift");

        } finally {

            setLoading(false);

        }
    }

    // delete
    async function deleteGift(id: string) {

        try {

            await deleteDoc(
                doc(db, "Video", id)
            );

            setVideo((prev) =>
                prev.filter((item) => item.id !== id)
            );

        } catch (error) {

            console.log(error);

            alert("Gagal hapus");

        }
    }

    useEffect(() => {
        fetchGift();
    }, []);


    async function updateTotal(
        id: string,
        total: number
    ) {

        try {

            await updateDoc(
                doc(db, "Gift", id),
                {
                    ProductTotal: total,
                }
            );

            setVideo((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            ProductTotal: total,
                        }
                        : item
                )
            );

        } catch (error) {

            console.log(error);

            alert("Gagal update total");

        }
    }
    return (
        <main className="min-h-screen bg-zinc-950 p-6">

            {/* header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white">
                   Video Course
                </h1>

                <p className="text-zinc-500 mt-2">
                    Kelola product gift, gambar,
                    stok, dan data lainnya.
                    Karena dashboard modern
                    tidak lengkap tanpa card gelap
                    dan tombol merah hapus.
                </p>
            </div>

            {/* form */}
            <div
                className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-6
          mb-10
          space-y-5
        "
            >

                {/* product name */}
                <div>
                    <label className="text-sm text-zinc-300 block mb-2">
                        Product Name
                    </label>

                    <input
                        type="text"
                        value={ProductName}
                        onChange={(e) =>
                            setProductName(e.target.value)
                        }
                        placeholder="Aromaterapi"
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
              focus:ring-pink-500
            "
                    />
                </div>

                {/* description */}
                <div>
                    <label className="text-sm text-zinc-300 block mb-2">
                        Product Description
                    </label>

                    <textarea
                        value={ProductDesc}
                        onChange={(e) =>
                            setProductDesc(e.target.value)
                        }
                        placeholder="Aromaterapi untuk kepala..."
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
              focus:ring-pink-500
            "
                    />
                </div>

                {/* total */}
                <div>
                    <label className="text-sm text-zinc-300 block mb-2">
                        Product Total
                    </label>

                    <input
                        type="number"
                        value={ProductTotal}
                        onChange={(e) =>
                            setProductTotal(
                                Number(e.target.value)
                            )
                        }
                        placeholder="0"
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
              focus:ring-pink-500
            "
                    />
                </div>

                {/* image */}
                <div>
                    <label className="text-sm text-zinc-300 block mb-2">
                        Image URL
                    </label>

                    <input
                        type="text"
                        value={urlImage}
                        onChange={(e) =>
                            setUrlImage(e.target.value)
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
              focus:ring-pink-500
            "
                    />
                </div>

                {/* preview */}
                {urlImage && (
                    <div
                        className="
              w-full
              h-60
              overflow-hidden
              rounded-2xl
              border
              border-zinc-800
            "
                    >
                        <img
                            src={urlImage}
                            alt="preview"
                            className="
                w-full
                h-full
                object-cover
              "
                        />
                    </div>
                )}

                {/* button */}
                <button
                    onClick={addGift}
                    disabled={loading}
                    className="
            w-full
            bg-pink-600
            hover:bg-pink-700
            disabled:opacity-50
            text-white
            font-semibold
            py-3
            rounded-xl
            transition
            flex
            items-center
            justify-center
            gap-2
          "
                >
                    <Plus size={18} />

                    {loading
                        ? "Loading..."
                        : "Tambah Product"}
                </button>
            </div>

            {/* cards */}
            <div
                className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
            >
                {video.map((item) => (
                    <div
                        key={item.id}
                        className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-3xl
              overflow-hidden
            "
                    >

                        {/* image */}
                        <div className="h-60 bg-zinc-800">
                            <img
                                src={item.module}
                                alt={item.title}
                                className="
                  w-full
                  h-full
                  object-cover
                "
                            />
                        </div>

                        {/* content */}
                        <div className="p-5">

                            {/* title */}
                            <div className="flex items-center gap-2 mb-3">
                                <GiftIcon
                                    size={18}
                                    className="text-pink-400"
                                />

                                <h2 className="text-white font-semibold text-lg">
                                    {item.order}
                                </h2>
                            </div>

                            {/* desc */}
                            <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                                {item.description}
                            </p>

                            {/* total */}
                            <div
                                className="
    flex
    items-center
    justify-between
    gap-3
    mb-5
  "
                            >
                                <div
                                    className="
      flex
      items-center
      gap-2
      text-zinc-300
    "
                                >
                                    <Package size={18} />

                                    <span>
                                        Stock:
                                        {" "}
                                        {item.id}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">

                                    {/* minus */}
                                    <button
                                        onClick={() =>
                                            updateTotal(
                                                item.id,
                                                item.order - 1
                                            )
                                        }
                                        disabled={item.order <= 0}
                                        className="
        w-9
        h-9
        rounded-lg
        bg-zinc-800
        text-white
        hover:bg-zinc-700
        disabled:opacity-40
      "
                                    >
                                        -
                                    </button>

                                    {/* plus */}
                                    <button
                                        onClick={() =>
                                            updateTotal(
                                                item.id,
                                                item.order + 1
                                            )
                                        }
                                        className="
        w-9
        h-9
        rounded-lg
        bg-pink-600
        text-white
        hover:bg-pink-700
      "
                                    >
                                        +
                                    </button>

                                </div>
                            </div>

                            {/* delete */}
                            <button
                                onClick={() =>
                                    deleteGift(item.id)
                                }
                                className="
                  w-full
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-400
                  py-3
                  rounded-xl
                  hover:bg-red-500/20
                  transition
                  flex
                  items-center
                  justify-center
                  gap-2
                "
                            >
                                <Trash2 size={18} />
                                Hapus Product
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
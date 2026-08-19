"use client";

import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Camera, Save, X, Pencil, LogOut, User, Link, Phone, Building2, CreditCard, Wallet } from "lucide-react";
import { signOut } from "firebase/auth";

const SUPABASE_PROJECT_URL = "https://yredbkgnngcgzfagnwah.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const SUPABASE_BUCKET = "assets";

interface UserData {
  name: string;
  sponsorUsername: string;
  email: string;
  bank: string;
  rekening: string;
  whatsapp: string;
  imageProfile: string;
  addressEVM: string;
}

const FIELDS = [
  { label: "Nama", key: "name", icon: User },
  { label: "WhatsApp", key: "whatsapp", icon: Phone },
  { label: "Bank", key: "bank", icon: Building2 },
  { label: "No Rekening", key: "rekening", icon: CreditCard },
  { label: "Alamat EVM", key: "addressEVM", icon: Wallet },
];

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.substring(0, 2).toUpperCase();
}

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<UserData>({
    name: "", sponsorUsername: "", email: "",
    bank: "", rekening: "", whatsapp: "",
    imageProfile: "", addressEVM: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>(userData);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data() as UserData;
        setUserData(data);
        setFormData(data);
      }
    };
    fetchUserData();
  }, []);

  const uploadToSupabase = async (file: File): Promise<string | null> => {
    const user = auth.currentUser;
    if (!user) return null;
    const fileName = `${user.uid}/${Date.now()}-${file.name}`;
    const uploadUrl = `${SUPABASE_PROJECT_URL}/storage/v1/object/${SUPABASE_BUCKET}/${fileName}`;
    try {
      const res = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": file.type,
          "x-upsert": "true",
        },
        body: file,
      });
      if (!res.ok) return null;
      return `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${SUPABASE_BUCKET}/${fileName}`;
    } catch {
      return null;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadToSupabase(file);
    if (!url) return alert("Upload gagal");
    const user = auth.currentUser;
    if (!user) return;
    const updated = { ...userData, imageProfile: url };
    await setDoc(doc(db, "users", user.uid), updated, { merge: true });
    setUserData(updated);
    setFormData(updated);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch {
      alert("Gagal logout");
    }
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const token = await user.getIdToken();
    const cleanData = {
      name: formData.name, email: formData.email,
      bank: formData.bank, rekening: formData.rekening,
      whatsapp: formData.whatsapp, imageProfile: formData.imageProfile,
      addressEVM: formData.addressEVM,
    };
    try {
      const res = await fetch("http://localhost:5000/update/update2", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(cleanData),
      });
      if (!res.ok) throw new Error("Request gagal");
    } catch (err: any) {
      console.error("ERROR:", err.message);
    }
    setUserData(formData);
    setIsEditing(false);
  };

  return (
    <div
      className="min-h-screen pb-24 px-5 pt-7 relative overflow-hidden"
      style={{ background: "", fontFamily: "'', sans-serif" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-24 -left-16 w-80 h-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-10 -right-12 w-64 h-64 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)" }} />

      {/* Page label */}
      <p className="mb-5 text-xs uppercase tracking-widest"
        style={{ fontFamily: "'DM Mono', monospace", color: "rgba(74,222,128,0.55)", letterSpacing: "0.2em" }}>
        // profile
      </p>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-7">
        <div className="relative mb-3" style={{ padding: 3, borderRadius: "50%",
          background: "linear-gradient(135deg, #4ade80, #166534)" }}>
          <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center"
            style={{ background: "#0a1f0e" }}>
            {userData.imageProfile ? (
              <img src={userData.imageProfile} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-black" style={{ color: "#4ade80" }}>
                {userData.name ? getInitials(userData.name) : "?"}
              </span>
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0.5 right-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{ background: "#052e16", border: "2px solid #020c04" }}
          >
            <Camera size={12} color="#4ade80" />
          </button>
          <input type="file" accept="image/*" ref={fileInputRef}
            onChange={handleImageUpload} className="hidden" />
        </div>

        <h1 className="text-xl font-black mb-0.5" style={{ color: "#166534" }}>
          {userData.name || "—"}
        </h1>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#166534" }}>
          {userData.email || "—"}
        </p>
      </div>

      {/* Info Card */}
      <div className="rounded-2xl mb-4 relative overflow-hidden"
        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Top line accent */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.35), transparent)" }} />

        <div className="px-5 pt-5 pb-3">
          <p className="mb-4 flex items-center gap-2"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em",
              color: "#166534", textTransform: "uppercase" }}>
            informasi akun
            <span className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
          </p>

  

          {/* Dynamic fields */}
          {FIELDS.map((field, i) => {
            const Icon = field.icon;
            const isLast = i === FIELDS.length - 1;
            const isEVM = field.key === "addressEVM";
            return (
              <div key={field.key}
                className={`flex items-center py-2.5 ${!isLast ? "border-b" : ""}`}
                style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                  style={{ background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.12)" }}>
                  <Icon size={12} color="#166534" />
                </div>
                <span className="min-w-[80px] uppercase"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#374151", letterSpacing: "0.08em" }}>
                  {field.label}
                </span>
                {isEditing ? (
                  <input
                    value={formData[field.key as keyof UserData]}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="flex-1 rounded-lg px-2.5 py-1.5 text-sm outline-none transition-all"
                    style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.2)",
                      color: "#166534", fontFamily: "'Syne', sans-serif" }}
                  />
                ) : (
                  <span className="flex-1 font-bold break-all"
                    style={{ fontSize: isEVM ? 11 : 13, color: isEVM ? "#166534" : "#166534",
                      fontFamily: isEVM ? "'DM Mono', monospace" : "'Syne', sans-serif" }}>
                    {userData[field.key as keyof UserData] || "—"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Buttons */}
      {isEditing ? (
        <div className="flex gap-3">
          <button onClick={handleSave} className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
            style={{ background: "linear-gradient(135deg, #166534, #15803d)",
              border: "1px solid rgba(74,222,128,0.2)", color: "#dcfce7" }}>
            <Save size={15} /> Simpan
          </button>
          <button onClick={() => { setFormData(userData); setIsEditing(false); }}
            className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#4b5563" }}>
            <X size={15} /> Batal
          </button>
        </div>
      ) : (
        <div className="flex gap-3 mb-7">
          <button onClick={() => setIsEditing(true)}
            className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
            style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ade80" }}>
            <Pencil size={15} /> Edit Profil
          </button>
          <button onClick={handleLogout}
            className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", color: "#f87171" }}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
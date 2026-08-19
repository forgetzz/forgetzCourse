"use client";

import Link from "next/link";
import { LayoutDashboard, BookOpen, Upload, LogOut } from "lucide-react";

export default function NavbarAdmin() {
  const menus = [
    {
      title: "Dashboard",
      href: "../../admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Gift Manage",
      href: "../../admin/gift",
      icon: BookOpen,
    },
    {
      title: "Module Manage",
      href: "../../admin/upload",
      icon: Upload,
    },
  ];

  return (
    <nav
      className="
        w-full
        h-20
        bg-zinc-950/80
        backdrop-blur-xl
        border-b
        border-zinc-800
        px-6
        flex
        items-center
        justify-between
        sticky
        top-0
        z-50
      "
    >
      {/* logo */}
      <div className="flex items-center gap-3">
        <div
          className="
            w-11
            h-11
            rounded-2xl
            bg-blue-600
            flex
            items-center
            justify-center
            text-white
            font-bold
            text-lg
          "
        >
          A
        </div>

        <div>
          <h1 className="text-white font-semibold text-lg">
            Admin Panel
          </h1>

          <p className="text-zinc-500 text-sm">
            Control the chaos
          </p>
        </div>
      </div>

      {/* menu */}
      <div className="hidden md:flex items-center gap-3">

        {menus.map((item, i) => {
          const Icon = item.icon;

          return (
            <Link
              key={i}
              href={item.href}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                text-zinc-300
                hover:text-white
                hover:bg-zinc-800
                transition
              "
            >
              <Icon size={18} />

              <span className="text-sm font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}

      </div>

      {/* right */}
      <div className="flex items-center gap-4">

        {/* profile */}
        <div className="hidden sm:flex items-center gap-3">
          <img
            src="../../images/12.png"
            alt="admin"
            className="
              w-11
              h-11
              rounded-full
              object-cover
              border
              border-zinc-700
            "
          />

          <div>
            <h2 className="text-sm font-medium text-white">
              Admin
            </h2>

            <p className="text-xs text-zinc-500">
              
            </p>
          </div>
        </div>

        {/* logout */}
        <button
          className="
            w-11
            h-11
            rounded-xl
            bg-red-500/10
            border
            border-red-500/20
            flex
            items-center
            justify-center
            text-red-400
            hover:bg-red-500/20
            transition
          "
        >
          <LogOut size={18} />
        </button>

      </div>
    </nav>
  );
}
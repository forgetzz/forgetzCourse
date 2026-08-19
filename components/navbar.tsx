"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, ArrowRight, Code2, X } from "lucide-react";
import clsx from "clsx";

const menuLinks = [
  { label: "Beranda", href: "#" },
  { label: "Tentang Kami", href: "#tentangKami" },
  { label: "Price List", href: "#kemitraan" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
   className="sticky top-0 z-50 w-full bg-[#050A05] border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
            <Code2 className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <span
            className="text-white font-black text-lg tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Forget<span className="text-green-400">Studio</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {menuLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={clsx(
                "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                pathname === link.href
                  ? "text-green-400"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-400" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black bg-green-400 hover:bg-green-300 transition-all duration-200"
            style={{ boxShadow: "0 0 20px rgba(74,222,128,0.25)" }}
          >
            Login
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Burger */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
                aria-label="Buka menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] p-0 border-l border-white/10"
              style={{ background: "#080E08" }}
            >
              <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
              <SheetDescription className="sr-only">Menu untuk navigasi situs.</SheetDescription>

              {/* Sheet Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <div className="w-6 h-6 rounded-md bg-green-500 flex items-center justify-center">
                    <Code2 className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
                  </div>
                  <span className="text-white font-black text-base" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Forget<span className="text-green-400">Studio</span>
                  </span>
                </Link>
              </div>

              {/* Sheet Links */}
              <nav className="flex flex-col px-4 pt-4 pb-6 gap-1">
                {menuLinks.map((link, i) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      pathname === link.href
                        ? "bg-green-500/10 text-green-400"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Sheet Footer CTA */}
              <div className="px-4 pt-2 border-t border-white/8 mt-auto pb-8">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-black bg-green-400 hover:bg-green-300 transition-colors"
                >
                  Login Member
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
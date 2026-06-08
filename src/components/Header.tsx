"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.png"
              alt="LOLARH"
              width={40}
              height={40}
              className="rounded-full w-9 h-9 md:w-10 md:h-10 object-cover"
            />
            <span className="text-sm md:text-base font-bold text-gray-800 leading-tight hidden xs:block">
              <span className="text-rose-500">LOLARH</span>{" "}
              <span className="text-pink-400 font-normal text-xs md:text-sm">
                Fragrance & Skincare
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-rose-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:text-rose-500 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-600"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-pink-100 bg-white">
          <nav className="flex flex-col px-4 py-3 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-medium text-gray-600 hover:text-rose-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

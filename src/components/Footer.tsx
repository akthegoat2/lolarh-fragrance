import Image from "next/image";
import Link from "next/link";
import { Music2, Phone, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="LOLARH"
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
              />
              <span className="font-bold text-white">
                LOLARH <span className="text-pink-300 font-normal text-sm">Fragrance & Skincare</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium fragrances and skincare products crafted to make you feel beautiful, confident, and radiant every day.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop All" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-pink-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-pink-300" />
                <span className="text-sm text-gray-400">
                  24, Araromi Street, Anifowoshe, Ikeja, Lagos State
                </span>
              </li>
              <li>
                <a
                  href="tel:08109052289"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-pink-300 transition-colors"
                >
                  <Phone size={14} className="shrink-0 text-pink-300" />
                  08109052289
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2349079115855"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-pink-300 transition-colors"
                >
                  <MessageCircle size={14} className="shrink-0 text-pink-300" />
                  +234 907 911 5855
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/lolarhfragranceskincare"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@lolarhfragrance_skincare"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all"
                aria-label="TikTok"
              >
                <Music2 size={18} />
              </a>
              <a
                href="https://wa.me/2349079115855"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} LOLARH FRAGRANCE & SKINCARE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

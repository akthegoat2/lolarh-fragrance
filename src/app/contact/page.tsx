import { MapPin, Phone, MessageCircle, Music2 } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-12 md:mb-16">
        <p className="text-rose-500 font-medium text-sm tracking-wider uppercase mb-2">
          Get in Touch
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Contact Us
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
          We&apos;d love to hear from you! Reach out via any of the channels below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Get in Touch</h2>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-pink-100">
            <MapPin size={20} className="text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-800 text-sm">Address</h3>
              <p className="text-gray-500 text-sm mt-0.5">
                24, Araromi Street, Anifowoshe,<br />Ikeja, Lagos State
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-pink-100">
            <Phone size={20} className="text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-800 text-sm">Call Us</h3>
              <a href="tel:08109052289" className="text-rose-500 text-sm hover:underline block mt-0.5">
                08109052289
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-pink-100">
            <MessageCircle size={20} className="text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-800 text-sm">WhatsApp</h3>
              <a
                href="https://wa.me/2349079115855"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-500 text-sm hover:underline block mt-0.5"
              >
                +234 907 911 5855
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h2>

          <a
            href="https://www.instagram.com/lolarhfragranceskincare"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-white border border-pink-100 hover:border-pink-200 hover:shadow-md transition-all group"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20} className="text-rose-500 shrink-0">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <div>
              <h3 className="font-medium text-gray-800 text-sm group-hover:text-rose-500 transition-colors">Instagram</h3>
              <p className="text-gray-400 text-xs mt-0.5">@lolarhfragranceskincare</p>
            </div>
          </a>

          <a
            href="https://www.tiktok.com/@lolarhfragrance_skincare"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-white border border-pink-100 hover:border-pink-200 hover:shadow-md transition-all group"
          >
            <Music2 size={20} className="text-rose-500 shrink-0" />
            <div>
              <h3 className="font-medium text-gray-800 text-sm group-hover:text-rose-500 transition-colors">TikTok</h3>
              <p className="text-gray-400 text-xs mt-0.5">@lolarhfragrance_skincare</p>
            </div>
          </a>

          <a
            href="https://wa.me/2349079115855"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-white border border-pink-100 hover:border-pink-200 hover:shadow-md transition-all group"
          >
            <MessageCircle size={20} className="text-rose-500 shrink-0" />
            <div>
              <h3 className="font-medium text-gray-800 text-sm group-hover:text-rose-500 transition-colors">WhatsApp</h3>
              <p className="text-gray-400 text-xs mt-0.5">Chat with us directly</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

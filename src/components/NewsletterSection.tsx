import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="bg-gradient-to-r from-rose-500 to-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Stay in the Glow
          </h2>
          <p className="text-pink-100 text-sm md:text-base mb-8">
            Follow us on social media for exclusive deals, new arrivals, and beauty tips.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://www.instagram.com/lolarhfragranceskincare"
              target="_blank"
              className="inline-flex items-center gap-2 bg-white text-rose-500 font-semibold px-6 py-3 rounded-full text-sm hover:bg-pink-50 transition-colors shadow-lg"
            >
              Follow on Instagram
            </Link>
            <Link
              href="https://wa.me/2349079115855"
              target="_blank"
              className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-white/30 transition-colors border border-white/30"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

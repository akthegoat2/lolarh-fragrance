import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-200/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-200/20 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <p className="text-rose-500 font-medium text-sm md:text-base tracking-wider uppercase mb-4">
            Premium Fragrance & Skincare
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Indulge Your{" "}
            <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
              Senses
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
            Discover our curated collection of luxury fragrances and skincare essentials. 
            Elevate your daily routine with LOLARH.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 active:scale-95 transition-all duration-300 text-sm md:text-base touch-manipulation"
            >
              Shop Now
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-full border border-pink-200 hover:border-pink-300 hover:bg-pink-50 active:scale-95 transition-all duration-300 text-sm md:text-base touch-manipulation"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -right-6 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-pink-200/20 to-rose-300/20 blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-48 h-48 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-pink-200/20 to-purple-200/10 blur-3xl pointer-events-none" />
    </section>
  );
}

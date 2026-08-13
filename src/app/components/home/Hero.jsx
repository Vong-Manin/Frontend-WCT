"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:h-[85vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
      {/* Background Slideshow - Responsive */}
      <div className="absolute inset-0 bg-[url('/image/hero-bg.jpg')] bg-cover bg-center animate-slide-1"></div>
      <div className="absolute inset-0 bg-[url('https://www.sunsetworldresorts.com/newsite/wp-content/uploads/2024/10/banner-principal-SR.webp')] bg-cover bg-center opacity-0 animate-slide-2"></div>
      <div className="absolute inset-0 bg-[url('https://luxcity.com/storage/photos/7/blogs/seafood-restaurant-phnom-penh-4.jpg')] bg-cover bg-center opacity-0 animate-slide-3"></div>

      {/* Overlay - Responsive */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-slate-950/95 z-10"></div>

      <div className="relative z-20 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        {/* Badge - Responsive */}
        <div className="animate-fade-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          <span className="text-resortGreen font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs bg-white/10 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full backdrop-blur-md inline-block">
            Experience Coastal Perfection
          </span>
        </div>

        {/* Title - Responsive */}
        <div className="animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-md">
            A Sanctuary Built For <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-resortGreen to-emerald-200">
              Luxury Escapes
            </span>
          </h1>
        </div>

        {/* Description - Responsive */}
        <div className="animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
          <p className="text-sm sm:text-base lg:text-xl text-slate-300 max-w-2xl mx-auto font-light drop-shadow px-2 sm:px-4">
            Discover a coastal paradise where luxury accommodations meet
            intuitive, automated systems designed entirely around your vacation
            plans.
          </p>
        </div>

        {/* Buttons - ALWAYS VISIBLE */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
          <Link
            href="/rooms"
            className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold bg-resortGreen hover:bg-emerald-600 text-white rounded-xl shadow-lg hover:shadow-resortGreen/30 transition-all text-center transform hover:-translate-y-0.5"
          >
            Explore Rooms
          </Link>
          <Link
            href="/booking"
            className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold bg-white/10 border border-white/20 hover:bg-white hover:text-slate-900 rounded-xl backdrop-blur-md transition-all transform hover:-translate-y-0.5 text-center"
          >
            Start Booking
          </Link>
        </div>
      </div>

      {/* Bottom Gradient - Responsive */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none z-20"></div>
    </section>
  );
}

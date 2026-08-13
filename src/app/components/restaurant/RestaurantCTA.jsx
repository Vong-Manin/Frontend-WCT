"use client";

import Link from "next/link";

export default function RestaurantCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
      <div className="relative bg-gradient-to-r from-resortGreen/10 to-emerald-200/10 dark:from-resortGreen/5 dark:to-emerald-900/10 rounded-3xl p-8 sm:p-12 md:p-16 text-center overflow-hidden border border-resortGreen/10">
        {/* Background Decor */}
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-resortGreen/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-emerald-200/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif">
            Ready for a Culinary Journey?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
            Experience the finest dining at Khyal Samut Resort
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 mt-4 sm:mt-6 px-6 sm:px-8 py-3 sm:py-4 bg-resortGreen hover:bg-resortGreen-dark text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-resortGreen/30 transform hover:-translate-y-1 text-sm tracking-wide"
          >
            <span>Book Your Stay</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

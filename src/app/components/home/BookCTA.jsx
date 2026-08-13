"use client";

import Link from "next/link";

export default function BookingCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div className="relative bg-gradient-to-tr from-white to-emerald-50/20 dark:from-slate-900 dark:to-slate-900/40 rounded-3xl p-8 md:p-14 text-slate-800 dark:text-slate-200 overflow-hidden shadow-md border border-emerald-100/40 dark:border-slate-800/80">
        {/* Background Blur Shapes */}
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-resortGreen/5 dark:bg-resortGreen/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-emerald-200/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Info Column */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-resortGreen/10 flex items-center justify-center text-xl shrink-0 text-resortGreen border border-resortGreen/25 shadow-inner">
              <i className="fa-regular fa-calendar-check"></i>
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-resortGreen block">
                Reservations
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Ready for your dream vacation?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl font-light leading-relaxed">
                Secure your villa stay today and lock down tailored amenities
                designed completely around luxury comfort.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Link
            href="/booking"
            className="bg-resortGreen hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 shrink-0 shadow-lg hover:shadow-xl hover:shadow-resortGreen/20 active:scale-95 transform hover:-translate-y-0.5 cursor-pointer text-sm tracking-wide group"
          >
            <span>Book Your Stay Now</span>
            <i className="fa-solid fa-arrow-right text-xs transform group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

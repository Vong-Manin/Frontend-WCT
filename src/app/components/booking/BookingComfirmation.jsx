// app/components/booking/BookingConfirmation.js
"use client";

import Link from "next/link";

export default function BookingConfirmation({ email, bookingReference }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
      <div className="w-20 h-20 bg-resortGreen/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-luxury-pop-in">
        <i className="fa-solid fa-check text-4xl text-resortGreen"></i>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif">
        Booking Confirmed!
      </h2>

      <p className="text-slate-500 dark:text-slate-400 mt-2">
        Your booking has been confirmed. We've sent a confirmation email to{" "}
        <strong className="text-slate-900 dark:text-white">{email}</strong>
      </p>

      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-left">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Booking Reference
        </p>
        <p className="text-lg font-mono font-bold text-slate-900 dark:text-white">
          #{bookingReference}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Link
          href="/rooms"
          className="flex-1 bg-resortGreen text-white font-bold py-3 px-6 rounded-xl hover:bg-resortGreen-dark transition shadow-lg hover:shadow-resortGreen/30"
        >
          Browse More Rooms
        </Link>
        <Link
          href="/"
          className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold py-3 px-6 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

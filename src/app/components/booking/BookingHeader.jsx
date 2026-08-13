// app/components/booking/BookingHeader.jsx
"use client";

import Link from "next/link";

export default function BookingHeader({ roomId, step }) {
  return (
    <div className="mb-6 sm:mb-8">
      <Link
        href={`/detail-room/${roomId}`}
        className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-resortGreen transition-colors group"
      >
        <i className="fa-solid fa-arrow-left text-xs transform group-hover:-translate-x-1 transition-transform"></i>
        <span>Back to Room</span>
      </Link>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mt-3 font-serif">
        Complete Your Booking
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
        Step {step} of 3
      </p>
    </div>
  );
}

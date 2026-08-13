// app/booking/BookingWrapper.jsx
"use client";

import { Suspense } from "react";
import BookingPage from "./page-content";

export default function BookingWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-resortGreen/20 border-t-resortGreen rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-500 dark:text-slate-400 mt-4">
              Loading booking...
            </p>
          </div>
        </div>
      }
    >
      <BookingPage />
    </Suspense>
  );
}

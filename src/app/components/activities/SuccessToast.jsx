// src/app/components/activities/SuccessToast.jsx
"use client";

import { useEffect } from "react";

export default function SuccessToast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-xs sm:max-w-md w-full bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-950 rounded-xl sm:rounded-2xl shadow-2xl p-4 flex items-start gap-3 animate-in slide-in-from-right duration-300">
      <div className="flex-shrink-0 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 rounded-xl p-2.5">
        <i className="fa-solid fa-circle-check text-xl"></i>
      </div>

      <div className="flex-1 space-y-0.5">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          Booking Confirmed! 🎉
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {message}
        </p>
      </div>

      <button
        onClick={onClose}
        className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}

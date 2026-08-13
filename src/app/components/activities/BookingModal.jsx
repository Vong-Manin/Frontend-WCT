// src/app/components/activities/BookingModal.jsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function BookingModal({ activity, isOpen, onClose, onConfirm }) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    guests: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      ...formData,
      activity: activity.heading,
      price: activity.price,
    });
    setFormData({ name: "", date: "", guests: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200 overflow-hidden">
        {/* Header with Image */}
        {activity && (
          <div className="relative h-32 sm:h-40">
            <Image
              src={activity.image}
              alt={activity.heading}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white hover:text-white/80 cursor-pointer p-1.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
            <div className="absolute bottom-3 left-4 right-4">
              <h3 className="text-white font-bold text-lg font-serif">
                {activity.title}: {activity.heading}
              </h3>
              <div className="flex items-center gap-3 text-white/80 text-xs">
                <span className="flex items-center gap-1">
                  <i className="fa-regular fa-clock"></i>
                  {activity.duration}
                </span>
                <span className="w-px h-3 bg-white/30"></span>
                <span className="font-bold text-emerald-300">
                  ${activity.price}/person
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Select Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Number of Guests
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                min="1"
                max="50"
                required
                placeholder="e.g. 2"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-resortGreen hover:bg-resortGreen/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-resortGreen/30 transition-all text-sm"
          >
            Confirm Reservation
          </button>

          <p className="text-center text-[10px] text-slate-400">
            <i className="fa-regular fa-lock mr-1"></i>
            Your booking is secure and confirmed instantly
          </p>
        </form>
      </div>
    </div>
  );
}

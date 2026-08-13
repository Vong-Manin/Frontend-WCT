// app/components/detail-room/RoomInfoCard.jsx
"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function RoomInfoCard({ room }) {
  const { isSignedIn } = useUser();

  // Calculate pricing for display (1 night default)
  const nights = 1;
  const subtotal = room.price * nights;
  const serviceFee = Math.round(subtotal * 0.1);
  const tax = Math.round(subtotal * 0.12);
  const totalPrice = subtotal + serviceFee + tax;

  // Get today and tomorrow for display
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Handle Book Now click - redirect to sign in if not authenticated
  const handleBookNow = (e) => {
    if (!isSignedIn) {
      e.preventDefault();
      const returnUrl = `/booking?room=${room.id}`;
      window.location.href = `/sign-in?redirect_url=${encodeURIComponent(returnUrl)}`;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg lg:sticky lg:top-24 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-resortGreen to-resortGreen-dark px-4 sm:px-6 py-3 sm:py-4">
        <h3 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
          <i className="fa-regular fa-circle-check"></i>
          <span>Book This Room</span>
        </h3>
      </div>

      <div className="p-4 sm:p-5 lg:p-6">
        {/* Price & Rating */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-resortGreen font-serif">
              ${room.price}
            </span>
            <span className="text-xs sm:text-sm text-slate-400"> / night</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-star text-amber-400 text-xs sm:text-sm"></i>
            <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              {room.rating}
            </span>
            <span className="text-xs sm:text-sm text-slate-400">
              ({room.reviews})
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2 sm:p-3 text-center border border-slate-100 dark:border-slate-700">
            <p className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-wider">
              Guests
            </p>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              <i className="fa-regular fa-user text-resortGreen mr-0.5 text-xs"></i>
              {room.maxGuests}
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2 sm:p-3 text-center border border-slate-100 dark:border-slate-700">
            <p className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-wider">
              Bed
            </p>
            <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
              <i className="fa-solid fa-bed text-resortGreen mr-0.5 text-xs"></i>
              {room.bedType}
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2 sm:p-3 text-center border border-slate-100 dark:border-slate-700">
            <p className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-wider">
              Size
            </p>
            <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
              <i className="fa-solid fa-maximize text-resortGreen mr-0.5 text-xs"></i>
              {room.size}
            </p>
          </div>
        </div>

        {/* Date Display */}
        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2.5 sm:p-3 mb-3 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Check-in:
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {formatDate(today)}
              </span>
            </div>
            <span className="text-slate-300 dark:text-slate-600">→</span>
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Check-out:
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {formatDate(tomorrow)}
              </span>
            </div>
          </div>
          <span className="text-xs font-medium text-resortGreen bg-resortGreen/10 px-2 py-0.5 rounded-full">
            1 night
          </span>
        </div>

        {/* Room Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <i className="fa-solid fa-tag text-resortGreen text-xs"></i>
            <span className="text-slate-500 dark:text-slate-400">
              Category:
            </span>
            <span className="font-medium text-slate-900 dark:text-white capitalize">
              {room.category || "Standard"}
            </span>
          </div>
          {room.viewType && (
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <i className="fa-solid fa-eye text-resortGreen text-xs"></i>
              <span className="text-slate-500 dark:text-slate-400">View:</span>
              <span className="font-medium text-slate-900 dark:text-white">
                {room.viewType}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <i className="fa-solid fa-door-open text-resortGreen text-xs"></i>
            <span className="text-slate-500 dark:text-slate-400">Room:</span>
            <span className="font-medium text-slate-900 dark:text-white truncate">
              {room.title}
            </span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-3 space-y-1">
          <div className="flex justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <span>${room.price} × 1 night</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <span>Service fee (10%)</span>
              <div className="relative group cursor-help">
                <i className="fa-regular fa-circle-question text-slate-400 text-[10px]"></i>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 text-center">
                  Platform maintenance, support & payment processing
                </div>
              </div>
            </div>
            <span>${serviceFee}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <span>Taxes (12%)</span>
              <div className="relative group cursor-help">
                <i className="fa-regular fa-circle-question text-slate-400 text-[10px]"></i>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 text-center">
                  VAT and local tourism taxes
                </div>
              </div>
            </div>
            <span>${tax}</span>
          </div>
          <div className="flex justify-between text-base sm:text-lg font-bold text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-700 pt-2 mt-1">
            <span>Total</span>
            <span className="text-resortGreen">${totalPrice}</span>
          </div>
        </div>

        {/* Book Now Button - Checks Authentication */}
        <Link
          href={`/booking?room=${room.id}`}
          onClick={handleBookNow}
          className="w-full mt-4 bg-resortGreen hover:bg-resortGreen/90 text-white font-bold py-3 sm:py-3.5 px-4 rounded-lg sm:rounded-xl transition-all shadow-lg hover:shadow-resortGreen/30 flex items-center justify-center gap-2 text-sm sm:text-base tracking-wide"
        >
          <span>Book Now</span>
          <i className="fa-solid fa-arrow-right text-xs sm:text-sm"></i>
        </Link>

        <p className="text-center text-[8px] sm:text-[10px] text-slate-400 mt-2">
          <i className="fa-regular fa-lock mr-1"></i>
          {isSignedIn
            ? "You'll be able to select dates and number of rooms on the booking page"
            : "Please sign in to book this room"}
        </p>

        {/* Trust Signals */}
        <div className="mt-3 flex items-center justify-center gap-3 text-[8px] sm:text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <i className="fa-regular fa-lock text-resortGreen"></i>
            Secure
          </span>
          <span className="w-px h-3 bg-slate-200 dark:bg-slate-700"></span>
          <span className="flex items-center gap-1">
            <i className="fa-regular fa-clock text-resortGreen"></i>
            24h free cancel
          </span>
          <span className="w-px h-3 bg-slate-200 dark:bg-slate-700"></span>
          <span className="flex items-center gap-1">
            <i className="fa-regular fa-circle-check text-resortGreen"></i>
            Verified
          </span>
        </div>

        {/* Small Description Preview */}
        {room.description && (
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <p className="text-[8px] sm:text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
              <i className="fa-regular fa-message mr-1 text-resortGreen"></i>
              {room.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

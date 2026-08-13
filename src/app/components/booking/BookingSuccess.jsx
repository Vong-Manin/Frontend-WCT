// app/components/booking/BookingSuccess.jsx
"use client";

import Link from "next/link";

export default function BookingSuccess({
  email,
  bookingReference,
  guestName,
  roomTitle,
  checkIn,
  checkOut,
  guests,
  roomsCount,
  totalPrice,
  countdown,
  cart = [],
  nights = 1,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-resortGreen/10 rounded-full animate-ping"></div>
          <div className="relative w-24 h-24 bg-resortGreen/20 rounded-full flex items-center justify-center animate-luxury-pop-in">
            <i className="fa-solid fa-check text-5xl text-resortGreen"></i>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white font-serif">
          🎉 Booking Confirmed!
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
          Thank you,{" "}
          <strong className="text-slate-900 dark:text-white">
            {guestName}
          </strong>
          ! Your booking for {roomsCount} room{roomsCount > 1 ? "s" : ""} has
          been confirmed.
        </p>
      </div>

      {/* Booking Reference */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Booking Reference
          </p>
          <p className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-white mt-1">
            #{bookingReference}
          </p>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Confirmation Email
          </p>
          <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white mt-1 truncate">
            {email}
          </p>
        </div>
      </div>

      {/* Rooms Summary */}
      <div className="mt-4 p-4 bg-resortGreen/5 border border-resortGreen/20 rounded-xl">
        <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-3">
          <i className="fa-regular fa-receipt mr-2 text-resortGreen"></i>
          Rooms Booked ({roomsCount})
        </h4>
        <div className="space-y-2">
          {cart.map((item) => (
            <div
              key={item.roomId}
              className="flex justify-between text-sm border-b border-slate-200 dark:border-slate-700 pb-2 last:border-0 last:pb-0"
            >
              <span className="text-slate-600 dark:text-slate-300">
                {item.room.title} × {item.quantity}
                {item.guests > 1 && ` (${item.guests} guests)`}
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                ${item.room.price * nights * item.quantity}
              </span>
            </div>
          ))}
          <div className="flex justify-between text-sm pt-2 border-t border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white">
              Total
            </span>
            <span className="font-bold text-resortGreen">${totalPrice}</span>
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-2">
          <i className="fa-regular fa-clock mr-2 text-blue-500"></i>
          What's Next?
        </h4>
        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <i className="fa-regular fa-envelope text-blue-500 mt-0.5 text-xs"></i>
            <span>
              We've sent a confirmation email to <strong>{email}</strong>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <i className="fa-regular fa-calendar-check text-blue-500 mt-0.5 text-xs"></i>
            <span>Your booking is confirmed and guaranteed</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="fa-regular fa-circle-check text-blue-500 mt-0.5 text-xs"></i>
            <span>
              You can manage your booking using reference #{bookingReference}
            </span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Link
          href="/rooms"
          className="flex-1 bg-resortGreen hover:bg-resortGreen/90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-resortGreen/30 text-center"
        >
          <i className="fa-solid fa-search mr-2"></i>
          Browse More Rooms
        </Link>
        <Link
          href="/"
          className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold py-3 px-6 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition text-center"
        >
          <i className="fa-solid fa-house mr-2"></i>
          Go to Home
        </Link>
      </div>

      {/* Auto-redirect countdown */}
      <p className="text-center text-xs text-slate-400 mt-4">
        <i className="fa-regular fa-clock mr-1"></i>
        Redirecting to home in {countdown} second{countdown > 1 ? "s" : ""}...
      </p>
    </div>
  );
}

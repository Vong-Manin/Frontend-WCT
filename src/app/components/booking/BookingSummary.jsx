// app/components/booking/BookingSummary.jsx
"use client";

export default function BookingSummary({
  room,
  bookingData,
  nights,
  subtotal,
  serviceFee,
  tax,
  grandTotal,
  cart = [],
  totalRooms = 0,
  totalGuests = 0,
}) {
  return (
    <div className="lg:sticky lg:top-24 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4 font-serif">
        Booking Summary
      </h3>

      <div className="space-y-3">
        {/* Rooms */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Rooms ({totalRooms})
          </p>
          {cart.map((item) => (
            <div key={item.roomId} className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-300">
                {item.room.title} × {item.quantity}
                {item.guests > 1 && ` (${item.guests} guests)`}
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                ${item.room.price * nights * item.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">
            Total Guests
          </span>
          <span className="font-medium text-slate-900 dark:text-white">
            {totalGuests}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">Check-in</span>
          <span className="font-medium text-slate-900 dark:text-white">
            {bookingData?.checkIn
              ? new Date(bookingData.checkIn).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "-"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">Check-out</span>
          <span className="font-medium text-slate-900 dark:text-white">
            {bookingData?.checkOut
              ? new Date(bookingData.checkOut).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "-"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">Nights</span>
          <span className="font-medium text-slate-900 dark:text-white">
            {nights}
          </span>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700 my-4"></div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>Service fee (10%)</span>
          <span>${serviceFee}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>Taxes (12%)</span>
          <span>${tax}</span>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 pt-2">
          <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white">
            <span>Total</span>
            <span className="text-resortGreen">${grandTotal}</span>
          </div>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          <i className="fa-regular fa-clock mr-1"></i>
          Free cancellation up to 24 hours before check-in
        </p>
      </div>
    </div>
  );
}

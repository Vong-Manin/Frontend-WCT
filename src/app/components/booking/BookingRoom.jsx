// app/components/booking/BookingSelect.jsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function BookingRoom({
  room,
  bookingData,
  onBookingChange,
  nights,
  subtotal,
  serviceFee,
  tax,
  grandTotal,
  onNext,
  error,
  availableRooms = [],
  cart = [],
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  onUpdateGuests,
}) {
  const [selectedRoomToAdd, setSelectedRoomToAdd] = useState("");

  // Get rooms not already in cart
  const getAvailableRooms = () => {
    const cartRoomIds = cart.map((item) => item.roomId);
    return availableRooms.filter((room) => !cartRoomIds.includes(room.id));
  };

  const handleAddRoom = () => {
    if (selectedRoomToAdd) {
      onAddToCart(parseInt(selectedRoomToAdd));
      setSelectedRoomToAdd("");
    }
  };

  const availableRoomsList = getAvailableRooms();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
        Select Your Rooms
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
          <i className="fa-solid fa-exclamation-circle mr-2"></i>
          {error}
        </div>
      )}

      {/* Check-in & Check-out */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            <i className="fa-regular fa-calendar mr-1 text-resortGreen"></i>{" "}
            Check-in
          </label>
          <input
            type="date"
            name="checkIn"
            value={bookingData.checkIn}
            onChange={onBookingChange}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            <i className="fa-regular fa-calendar mr-1 text-resortGreen"></i>{" "}
            Check-out
          </label>
          <input
            type="date"
            name="checkOut"
            value={bookingData.checkOut}
            onChange={onBookingChange}
            min={bookingData.checkIn}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
          />
        </div>
      </div>

      {/* Cart - Selected Rooms - REDESIGNED */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <i className="fa-solid fa-shopping-cart mr-1 text-resortGreen"></i>
            Your Cart ({cart.length} room{cart.length > 1 ? "s" : ""})
          </label>
          {cart.length > 0 && (
            <span className="text-[10px] text-slate-400">
              {cart.reduce((acc, item) => acc + item.quantity, 0)} total rooms
            </span>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
            <i className="fa-regular fa-shopping-cart text-3xl text-slate-300 dark:text-slate-600 mb-2 block"></i>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No rooms selected yet
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Add a room below to start your booking
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.roomId}
                className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Room Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={item.room.images?.[0] || "/image/placeholder.jpg"}
                        alt={item.room.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80px, 80px"
                      />
                    </div>

                    {/* Room Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                        {item.room.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs text-resortGreen font-medium">
                          ${item.room.price}/night
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Max {item.room.maxGuests} guests
                        </span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {/* Quantity */}
                      <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 px-2 py-1">
                        <label className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          Qty
                        </label>
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            onUpdateQuantity(
                              item.roomId,
                              parseInt(e.target.value),
                            )
                          }
                          className="bg-transparent text-sm font-medium text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Guests per room */}
                      <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 px-2 py-1">
                        <label className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          Guests
                        </label>
                        <select
                          value={item.guests}
                          onChange={(e) =>
                            onUpdateGuests(
                              item.roomId,
                              parseInt(e.target.value),
                            )
                          }
                          className="bg-transparent text-sm font-medium text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                        >
                          {[...Array(item.room.maxGuests || 10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Subtotal per room */}
                      <div className="text-right min-w-[60px]">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Subtotal
                        </p>
                        <p className="text-sm font-bold text-resortGreen">
                          ${item.room.price * nights * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom bar with room details */}
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-[10px] text-slate-400">
                      <span>
                        <i className="fa-regular fa-user mr-1"></i>
                        {item.guests} guest{item.guests > 1 ? "s" : ""} per room
                      </span>
                      <span>
                        <i className="fa-regular fa-calendar mr-1"></i>
                        {nights} night{nights > 1 ? "s" : ""}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(item.roomId)}
                      className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add More Rooms */}
      {availableRoomsList.length > 0 && (
        <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            <i className="fa-solid fa-plus mr-1 text-resortGreen"></i> Add
            Another Room
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={selectedRoomToAdd}
              onChange={(e) => setSelectedRoomToAdd(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
            >
              <option value="">Select a room type...</option>
              {availableRoomsList.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.title} - ${room.price}/night · Max {room.maxGuests}{" "}
                  guests
                </option>
              ))}
            </select>
            <button
              onClick={handleAddRoom}
              disabled={!selectedRoomToAdd}
              className="bg-resortGreen hover:bg-resortGreen/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-2.5 rounded-xl transition whitespace-nowrap text-sm"
            >
              <i className="fa-solid fa-plus mr-1.5"></i>
              Add Room
            </button>
          </div>
        </div>
      )}

      {availableRoomsList.length === 0 && cart.length > 0 && (
        <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
          <p className="text-xs text-emerald-600 dark:text-emerald-400 text-center">
            <i className="fa-regular fa-circle-check mr-1"></i>
            All available rooms have been added to your cart
          </p>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-2">
        {cart.map((item) => (
          <div
            key={item.roomId}
            className="flex justify-between text-sm text-slate-600 dark:text-slate-400"
          >
            <span>
              {item.room.title} × {item.quantity}
              {item.guests > 1 && ` (${item.guests} guests)`}
            </span>
            <span>${item.room.price * nights * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <span>Service fee (10%)</span>
            <div className="relative group cursor-help">
              <i className="fa-regular fa-circle-question text-slate-400 text-[10px]"></i>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 text-center">
                Covers platform maintenance, customer support, and payment
                processing
              </div>
            </div>
          </div>
          <span>${serviceFee}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <span>Taxes (12%)</span>
            <div className="relative group cursor-help">
              <i className="fa-regular fa-circle-question text-slate-400 text-[10px]"></i>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 text-center">
                Government-mandated taxes including VAT and local tourism tax
              </div>
            </div>
          </div>
          <span>${tax}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-700 pt-2">
          <span>Total</span>
          <span className="text-resortGreen">${grandTotal}</span>
        </div>
      </div>

      {/* Total Rooms & Guests Summary */}
      {cart.length > 0 && (
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
          <span>
            <i className="fa-regular fa-user mr-1.5 text-resortGreen"></i>
            Total Guests:{" "}
            <strong className="text-slate-900 dark:text-white">
              {cart.reduce((acc, item) => acc + item.guests * item.quantity, 0)}
            </strong>
          </span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span>
            <i className="fa-solid fa-door-open mr-1.5 text-resortGreen"></i>
            Total Rooms:{" "}
            <strong className="text-slate-900 dark:text-white">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </strong>
          </span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span>
            <i className="fa-regular fa-calendar mr-1.5 text-resortGreen"></i>
            Nights:{" "}
            <strong className="text-slate-900 dark:text-white">{nights}</strong>
          </span>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={cart.length === 0}
        className="w-full mt-4 bg-resortGreen hover:bg-resortGreen/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-resortGreen/30 flex items-center justify-center gap-2"
      >
        <span>Continue to Guest Details</span>
        <i className="fa-solid fa-arrow-right"></i>
      </button>

      {cart.length === 0 && (
        <p className="text-center text-xs text-amber-500 mt-2">
          <i className="fa-regular fa-circle-exclamation mr-1"></i>
          Please add at least one room to continue
        </p>
      )}
    </div>
  );
}

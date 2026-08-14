"use client";

import { useState, useEffect } from "react";

export default function RoomSearch({
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  roomsCount,
  setRoomsCount,
  onSearch,
}) {
  const [localCheckIn, setLocalCheckIn] = useState(checkIn || "");
  const [localCheckOut, setLocalCheckOut] = useState(checkOut || "");
  const [localGuests, setLocalGuests] = useState(guests || 1);
  const [localRoomsCount, setLocalRoomsCount] = useState(roomsCount || 1);
  const [isSearching, setIsSearching] = useState(false);

  // Sync local state with props when they change
  useEffect(() => {
    if (checkIn) setLocalCheckIn(checkIn);
  }, [checkIn]);

  useEffect(() => {
    if (checkOut) setLocalCheckOut(checkOut);
  }, [checkOut]);

  useEffect(() => {
    if (guests) setLocalGuests(guests);
  }, [guests]);

  useEffect(() => {
    if (roomsCount) setLocalRoomsCount(roomsCount);
  }, [roomsCount]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSearching(true);

    // Update parent state with local values
    setCheckIn(localCheckIn);
    setCheckOut(localCheckOut);
    setGuests(localGuests);
    setRoomsCount(localRoomsCount);

    // Call the search handler
    if (onSearch) {
      onSearch({
        checkIn: localCheckIn,
        checkOut: localCheckOut,
        guests: localGuests,
        rooms: localRoomsCount,
      });
    }

    // Reset searching state after a moment
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  const getMinCheckoutDate = () => {
    if (localCheckIn) {
      const date = new Date(localCheckIn);
      date.setDate(date.getDate() + 1);
      return date.toISOString().split("T")[0];
    }
    return "";
  };

  // Auto-set dates on mount
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    if (!localCheckIn && !localCheckOut) {
      setLocalCheckIn(formatDate(today));
      setLocalCheckOut(formatDate(tomorrow));
    }
  }, [localCheckIn, localCheckOut]);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end"
    >
      <div className="space-y-1.5">
        <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <i className="far fa-calendar-alt text-resortGreen text-xs sm:text-sm"></i>{" "}
          Check-in
        </label>
        <input
          type="date"
          value={localCheckIn}
          onChange={(e) => setLocalCheckIn(e.target.value)}
          required
          className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition shadow-sm"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <i className="far fa-calendar-alt text-resortGreen text-xs sm:text-sm"></i>{" "}
          Check-out
        </label>
        <input
          type="date"
          value={localCheckOut}
          onChange={(e) => setLocalCheckOut(e.target.value)}
          min={getMinCheckoutDate()}
          required
          className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition shadow-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:col-span-2 lg:col-span-1">
        <div className="space-y-1.5">
          <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <i className="fas fa-user-friends text-resortGreen text-xs sm:text-sm"></i>{" "}
            Guests
          </label>
          <input
            type="number"
            value={localGuests}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              if (val >= 1 && val <= 10) setLocalGuests(val);
            }}
            min="1"
            max="10"
            className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-center focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition shadow-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <i className="fas fa-door-open text-resortGreen text-xs sm:text-sm"></i>{" "}
            Rooms
          </label>
          <input
            type="number"
            value={localRoomsCount}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              if (val >= 1 && val <= 5) setLocalRoomsCount(val);
            }}
            min="1"
            max="5"
            className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-center focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition shadow-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-2 lg:col-span-1">
        <button
          type="submit"
          disabled={isSearching}
          className="w-full bg-resortGreen hover:bg-resortGreen-dark disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl shadow-lg shadow-resortGreen/30 transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-base tracking-wide"
        >
          <i
            className={`fas ${isSearching ? "fa-spinner fa-spin" : "fa-magnifying-glass"} text-xs sm:text-sm`}
          ></i>
          <span>{isSearching ? "Searching..." : "Search"}</span>
        </button>
      </div>
    </form>
  );
}

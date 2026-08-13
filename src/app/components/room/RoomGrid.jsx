"use client";

import { useState } from "react";
import BookingRoomCard from "./RoomCard";

export default function RoomGrid({
  rooms,
  visibleRooms,
  onLoadMore,
  onClearFilters,
  checkIn,
  checkOut,
  guests,
  roomsCount,
  selectedCategory,
  onFilterChange,
}) {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const totalRooms = rooms.length;
  const hasMore = visibleRooms < totalRooms;

  const getPriceStats = () => {
    if (totalRooms === 0) return { min: 0, max: 0, avg: 0 };
    const prices = rooms.map((r) => r.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    return { min, max, avg };
  };

  const priceStats = getPriceStats();

  const priceRanges = [
    { id: "all", label: `All Prices`, value: Infinity },
    {
      id: "budget",
      label: `$${Math.min(...rooms.map((r) => r.price)) || 0} - $300`,
      value: 300,
    },
    { id: "moderate", label: `$301 - $500`, value: 500 },
    {
      id: "luxury",
      label: `$${Math.max(...rooms.map((r) => r.price)) || 0}+`,
      value: 800,
    },
  ];

  const handlePriceRangeSelect = (rangeId, maxPrice) => {
    setSelectedPriceRange(rangeId);
    if (onFilterChange) {
      onFilterChange("budget", maxPrice);
    }
    setShowMobileFilters(false);
  };

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      {/* Stats Bar - Sticky on mobile */}
      <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-2.5 sm:p-3 lg:p-4 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 lg:gap-3">
        {/* Left: Room count & stats */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              {totalRooms}
            </span>
            <span className="text-[8px] sm:text-[10px] lg:text-sm text-slate-500 dark:text-slate-400">
              rooms
            </span>
          </div>

          {/* Desktop: Full stats */}
          {totalRooms > 0 && (
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-arrow-up text-emerald-500 text-[10px]"></i>
                ${priceStats.min}
              </span>
              <span className="text-slate-300">—</span>
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-arrow-down text-rose-500 text-[10px]"></i>
                ${priceStats.max}
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1">
                <i className="fa-regular fa-circle text-resortGreen text-[10px]"></i>
                Avg ${priceStats.avg}
              </span>
            </div>
          )}

          {/* Tablet: Min/Max only */}
          {totalRooms > 0 && (
            <div className="hidden sm:flex lg:hidden items-center gap-1.5 text-[9px] sm:text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-0.5">
                <i className="fa-solid fa-arrow-up text-emerald-500 text-[8px] sm:text-[10px]"></i>
                ${priceStats.min}
              </span>
              <span className="text-slate-300">—</span>
              <span className="flex items-center gap-0.5">
                <i className="fa-solid fa-arrow-down text-rose-500 text-[8px] sm:text-[10px]"></i>
                ${priceStats.max}
              </span>
            </div>
          )}
        </div>

        {/* Right: Filters & View Toggle */}
        <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2">
          {/* Desktop: Price range buttons */}
          <div className="hidden md:flex items-center gap-1">
            {priceRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => handlePriceRangeSelect(range.id, range.value)}
                className={`px-2 sm:px-2.5 lg:px-3 py-1 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] lg:text-xs font-medium transition-all whitespace-nowrap ${
                  selectedPriceRange === range.id
                    ? "bg-resortGreen/10 text-resortGreen border border-resortGreen/20"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Mobile: View Toggle (Grid/List) */}
          <div className="sm:hidden flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-2 py-1 text-xs transition-colors ${
                viewMode === "grid"
                  ? "bg-resortGreen text-white"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <i className="fa-solid fa-grid-2"></i>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-2 py-1 text-xs transition-colors ${
                viewMode === "list"
                  ? "bg-resortGreen text-white"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div>

          {/* Mobile & Tablet: Filter dropdown trigger */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] sm:text-xs font-medium flex items-center gap-1.5"
          >
            <i className="fa-solid fa-sliders text-[10px] sm:text-xs"></i>
            <span className="hidden xs:inline">Filter</span>
          </button>

          {/* View Toggle - Tablet only */}
          <div className="hidden sm:flex md:hidden border border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-2 sm:px-2.5 py-1 sm:py-1.5 text-[8px] sm:text-[10px] transition-colors ${
                viewMode === "grid"
                  ? "bg-resortGreen text-white"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <i className="fa-solid fa-grid-2"></i>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-2 sm:px-2.5 py-1 sm:py-1.5 text-[8px] sm:text-[10px] transition-colors ${
                viewMode === "list"
                  ? "bg-resortGreen text-white"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      {showMobileFilters && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          ></div>
          <div className="relative w-full bg-white dark:bg-slate-900 rounded-t-2xl p-4 sm:p-6 animate-slide-up max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Filter by Price
              </h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <i className="fa-solid fa-xmark text-slate-500"></i>
              </button>
            </div>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => handlePriceRangeSelect(range.id, range.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    selectedPriceRange === range.id
                      ? "bg-resortGreen/10 text-resortGreen border border-resortGreen/20"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Room Grid */}
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {rooms.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <i className="fa-regular fa-folder-open text-4xl sm:text-5xl text-slate-300 dark:text-slate-700 mb-3 sm:mb-4 block"></i>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base">
              No rooms match your criteria
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
              Try adjusting your filters
            </p>
            <button
              onClick={onClearFilters}
              className="mt-3 sm:mt-4 px-4 sm:px-6 py-1.5 sm:py-2 bg-resortGreen text-white rounded-xl text-[10px] sm:text-sm font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div
              className={`grid gap-3 sm:gap-4 lg:gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {rooms.slice(0, visibleRooms).map((room) => (
                <BookingRoomCard
                  key={room.id}
                  room={room}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center pt-2 sm:pt-3 lg:pt-4">
                <button
                  onClick={onLoadMore}
                  className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-3.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:border-resortGreen/50 hover:shadow-lg transition-all flex items-center justify-center gap-2 text-[10px] sm:text-sm"
                >
                  <i className="fa-solid fa-arrow-down text-[10px] sm:text-sm"></i>
                  <span>Load More ({totalRooms - visibleRooms} remaining)</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

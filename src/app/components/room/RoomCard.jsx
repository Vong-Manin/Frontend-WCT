"use client";

import Image from "next/image";
import Link from "next/link";

export default function RoomCard({ room, viewMode = "grid" }) {
  const isListView = viewMode === "list";

  const getCategoryBadge = (category) => {
    const badges = {
      suite: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
      villa: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      family: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
      luxury: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
      default: "bg-slate-500/20 text-slate-600 dark:text-slate-400",
    };
    return badges[category?.toLowerCase()] || badges.default;
  };

  return (
    <div
      className={`group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-resortGreen/30 hover:shadow-xl transition-all duration-300 ${
        isListView ? "flex flex-col sm:flex-row" : ""
      }`}
    >
      <Link
        href={`/detail-room/${room.id}`}
        className={`relative overflow-hidden bg-slate-100 block ${
          isListView
            ? "sm:w-56 md:w-64 lg:w-80 h-48 sm:h-auto aspect-[4/3]"
            : "aspect-[4/3]"
        }`}
      >
        <Image
          src={room.images?.[0] || "/image/placeholder.jpg"}
          alt={room.title || "Room"}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {room.category && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
            <span
              className={`text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg ${getCategoryBadge(
                room.category,
              )}`}
            >
              <i className="fa-solid fa-tag mr-0.5 sm:mr-1"></i>
              {room.category}
            </span>
          </div>
        )}

        {room.popular && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
            <span className="bg-rose-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-lg">
              ★ Popular
            </span>
          </div>
        )}

        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-slate-950/70 backdrop-blur-sm text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1">
          <i
            className={`${room.viewIcon || "fa-solid fa-tree"} text-${
              room.viewIconColor || "emerald"
            }-400 text-[8px] sm:text-[10px]`}
          ></i>
          {room.viewType || "Resort View"}
        </div>

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-[10px] sm:text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            <i className="fa-regular fa-eye mr-1 sm:mr-2 text-[10px] sm:text-sm"></i>
            View Details
          </span>
        </div>
      </Link>

      <div
        className={`flex-1 p-3 sm:p-4 lg:p-6 space-y-1.5 sm:space-y-2 lg:space-y-3 ${
          isListView ? "flex flex-col justify-between" : ""
        }`}
      >
        <div>
          <div className="flex items-start justify-between gap-2 sm:gap-3 lg:gap-4">
            <div>
              <Link href={`/detail-room/${room.id}`}>
                <h3 className="text-sm sm:text-base lg:text-xl font-bold text-slate-900 dark:text-white hover:text-resortGreen transition-colors line-clamp-1">
                  {room.title || "Room"}
                </h3>
              </Link>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 flex-wrap">
                <span className="text-[8px] sm:text-[10px] lg:text-xs text-slate-400">
                  <i className="fa-solid fa-maximize mr-0.5 sm:mr-1 text-[8px] sm:text-[10px]"></i>{" "}
                  {room.size || "N/A"}
                </span>
                <span className="text-[8px] sm:text-[10px] lg:text-xs text-slate-300">
                  •
                </span>
                <span className="text-[8px] sm:text-[10px] lg:text-xs text-slate-400">
                  <i className="fa-regular fa-star mr-0.5 sm:mr-1 text-[8px] sm:text-[10px]"></i>{" "}
                  {room.stars || 4}★
                </span>
                <span className="text-[8px] sm:text-[10px] lg:text-xs text-slate-300">
                  •
                </span>
                <span className="text-[8px] sm:text-[10px] lg:text-xs text-slate-400">
                  <i className="fa-regular fa-user mr-0.5 sm:mr-1 text-[8px] sm:text-[10px]"></i>{" "}
                  {room.maxGuests || 2} guests
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <div className="hidden sm:block text-right">
                <p className="text-[10px] lg:text-xs font-bold text-slate-900 dark:text-white leading-none">
                  {room.ratingLabel || "Good"}
                </p>
                <p className="text-[8px] lg:text-[10px] text-slate-400">
                  {room.reviews || 0} reviews
                </p>
              </div>
              <div className="bg-resortGreen text-white text-[10px] sm:text-xs lg:text-sm font-extrabold w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center">
                {room.rating || 4.5}
              </div>
            </div>
          </div>

          {isListView && room.description && (
            <p className="text-[10px] sm:text-xs lg:text-sm text-slate-500 dark:text-slate-400 mt-1 sm:mt-2 line-clamp-2">
              {room.description}
            </p>
          )}

          <div className="flex flex-wrap gap-0.5 sm:gap-1 lg:gap-1.5 mt-1.5 sm:mt-2 lg:mt-3">
            {(room.amenities || [])
              .slice(0, isListView ? 6 : 2)
              .map((amenity, idx) => (
                <span
                  key={idx}
                  className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[7px] sm:text-[8px] lg:text-xs font-semibold px-1 sm:px-1.5 lg:px-2.5 py-0.5 rounded-full"
                >
                  <i className="fa-solid fa-check mr-0.5 sm:mr-1 text-[6px] sm:text-[8px]"></i>{" "}
                  <span className="hidden xs:inline">{amenity}</span>
                  <span className="xs:hidden">{amenity.substring(0, 6)}</span>
                </span>
              ))}
            {(room.amenities || []).length > (isListView ? 6 : 2) && (
              <span className="text-[7px] sm:text-[8px] lg:text-xs text-slate-400 font-medium">
                +{(room.amenities || []).length - (isListView ? 6 : 2)}
              </span>
            )}
          </div>
        </div>

        <div
          className={`flex items-center justify-between pt-1.5 sm:pt-2 lg:pt-3 border-t border-slate-100 dark:border-slate-800 ${
            isListView ? "mt-0" : ""
          }`}
        >
          <div>
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="text-sm sm:text-lg lg:text-2xl font-black text-slate-900 dark:text-white font-serif">
                ${room.price || 0}
              </span>
              <span className="text-[8px] sm:text-[10px] lg:text-xs text-slate-400">
                / night
              </span>
            </div>
            {room.price && room.price < 300 && (
              <span className="text-[7px] sm:text-[8px] lg:text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-0.5 sm:gap-1">
                <i className="fa-solid fa-tag text-[7px] sm:text-[8px]"></i>{" "}
                Best Value
              </span>
            )}
            {room.price && room.price > 500 && (
              <span className="text-[7px] sm:text-[8px] lg:text-[10px] text-amber-600 dark:text-amber-400 font-medium flex items-center gap-0.5 sm:gap-1">
                <i className="fa-solid fa-crown text-[7px] sm:text-[8px]"></i>{" "}
                Premium
              </span>
            )}
          </div>
          <Link
            href={`/booking?room=${room.id}`}
            className="bg-resortGreen hover:bg-resortGreen/90 text-white py-1 sm:py-1.5 lg:py-2 px-2 sm:px-3 lg:px-5 rounded-xl transition-colors font-semibold text-[8px] sm:text-[10px] lg:text-sm shadow-sm hover:shadow-resortGreen/20 flex items-center gap-0.5 sm:gap-1 lg:gap-2"
          >
            <span className="hidden xs:inline">Book Now</span>
            <span className="xs:hidden">Book</span>
            <i className="fa-solid fa-arrow-right text-[7px] sm:text-[8px] lg:text-xs"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

// src/app/components/activities/ActivityCard.jsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function ActivityCard({
  activity,
  onBook,
  isPriority = false,
  index = 0,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Early return if activity is undefined
  if (!activity || typeof activity !== "object") {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-lg p-6 text-center h-full flex items-center justify-center">
        <div>
          <i className="fa-regular fa-circle-exclamation text-2xl text-amber-500 mb-2"></i>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Activity data is missing
          </p>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "wellness":
        return "fa-solid fa-spa";
      case "adventure":
        return "fa-solid fa-water";
      case "cruise":
        return "fa-solid fa-sailboat";
      default:
        return "fa-solid fa-compass";
    }
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case "wellness":
        return "Wellness";
      case "adventure":
        return "Adventure";
      case "cruise":
        return "Cruise";
      default:
        return category || "Experience";
    }
  };

  // Safe fallback values
  const imageUrl = activity.image || "/image/placeholder.jpg";
  const heading = activity.heading || "Activity";
  const title = activity.title || "Experience";
  const description = activity.description || "No description available.";
  const duration = activity.duration || "60 Mins";
  const price = activity.price || 0;
  const tag = activity.tag || "Included";
  const icon = activity.icon || "fa-solid fa-compass";
  const category = activity.category || "adventure";

  return (
    <div
      className="group relative bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={heading}
          fill
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "auto"}
          priority={isPriority}
          className={`object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => {
            e.currentTarget.src = "/image/placeholder.jpg";
          }}
        />

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Category Badge - Top Left */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[8px] sm:text-[10px] font-bold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/10 transition-all duration-300 group-hover:bg-resortGreen/90 group-hover:border-resortGreen/30 z-10">
          <i
            className={`${getCategoryIcon(category)} text-emerald-400 text-[8px] sm:text-[10px] group-hover:text-white transition-colors duration-300`}
          ></i>
          {getCategoryBadge(category)}
        </div>

        {/* Quick Action Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 z-20 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => onBook && onBook(activity)}
            className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold px-6 py-2.5 rounded-xl shadow-2xl hover:bg-resortGreen hover:text-white transition-all duration-300 transform scale-90 group-hover:scale-100 hover:scale-105 text-sm"
          >
            <i className="fa-regular fa-calendar-plus mr-2"></i>
            Book Now
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
        {/* Title Section */}
        <div className="mb-2">
          <p className="text-[10px] sm:text-xs text-resortGreen font-semibold uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white font-serif tracking-tight group-hover:text-resortGreen transition-colors duration-300 line-clamp-1">
            {heading}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 flex-grow">
          {description}
        </p>

        {/* Details Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 group-hover:border-resortGreen/20 transition-colors duration-300 mt-auto">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-lg group-hover:bg-resortGreen/10 group-hover:text-resortGreen transition-all duration-300 whitespace-nowrap">
              <i className="fa-regular fa-clock text-resortGreen"></i>
              {duration}
            </span>
            <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-lg group-hover:bg-resortGreen/10 group-hover:text-resortGreen transition-all duration-300 whitespace-nowrap">
              <i className={`${icon} text-resortGreen`}></i>
              {tag}
            </span>
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-lg sm:text-xl font-bold text-resortGreen group-hover:text-resortGreen/80 transition-colors duration-300">
              ${price}
            </span>
            <span className="text-[10px] text-slate-400">/person</span>
          </div>
        </div>

        {/* Book Button - Mobile Only */}
        <button
          onClick={() => onBook && onBook(activity)}
          className="w-full mt-3 bg-resortGreen hover:bg-resortGreen/90 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 text-xs sm:text-sm md:hidden hover:shadow-lg active:scale-95"
        >
          <i className="fa-regular fa-calendar-plus mr-2"></i>
          Book Experience
        </button>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";

export default function RestaurantCard({ item }) {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-resortGreen/10 transition-all duration-500 border border-slate-200 dark:border-slate-800 hover:-translate-y-2">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          src={item.image}
          alt={item.title}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-[8px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-1 rounded-full shadow-lg ${item.badgeColor}`}
          >
            {item.category}
          </span>
        </div>
        {/* Time Badge */}
        <div className="absolute bottom-3 left-3 bg-slate-950/70 backdrop-blur-sm text-white text-[8px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <i className="fa-regular fa-clock text-resortGreen-light"></i>
          {item.time}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3">
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white group-hover:text-resortGreen transition-colors">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-400">
            <i className="fa-regular fa-clock"></i>
            <span>{item.time}</span>
          </div>
          {/* Navigate to reserve page */}
          <Link
            href={`/reserve?restaurant=${item.id}&name=${encodeURIComponent(item.title)}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-resortGreen hover:text-resortGreen-dark transition-colors group/btn"
          >
            <span>Book Table</span>
            <i className="fa-solid fa-arrow-right text-[10px] transform group-hover/btn:translate-x-1 transition-transform"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

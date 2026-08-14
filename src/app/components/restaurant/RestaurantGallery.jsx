"use client";

import Image from "next/image";
import { useResortContent } from "@/app/components/providers/ResortContentProvider";

export default function RestaurantGallery() {
  const { restaurantGallery } = useResortContent();

  return (
    <div>
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif">
          Restaurant Gallery
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          A visual journey through our culinary spaces
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {restaurantGallery.map((item, idx) => (
          <div
            key={item.id}
            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={item.image?.url || "/image/placeholder.jpg"}
              alt={item.image?.alternativeText || item.title || `Restaurant gallery ${idx + 1}`}
              width={400}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <i className="fa-regular fa-eye text-white text-2xl"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

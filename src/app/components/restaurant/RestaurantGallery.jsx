"use client";

import Image from "next/image";

const galleryImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
  "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
];

export default function RestaurantGallery() {
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
        {galleryImages.map((img, idx) => (
          <div
            key={idx}
            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={img}
              alt={`Restaurant gallery ${idx + 1}`}
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

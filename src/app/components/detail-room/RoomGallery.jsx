"use client";

import { useState } from "react";
import Image from "next/image";

export default function RoomGallery({ images, title }) {
  const [activeImage, setActiveImage] = useState(0);

  // Ensure we have at least one image
  const imageList =
    images && images.length > 0 ? images : ["/image/placeholder.jpg"];
  const mainImage = imageList[activeImage] || imageList[0];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Main Image Container */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden bg-slate-100">
          <Image
            src={mainImage}
            alt={`${title} - Image ${activeImage + 1}`}
            fill
            className="object-cover"
            priority={activeImage === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Image counter badge */}
          {imageList.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg font-medium">
              {activeImage + 1} / {imageList.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {imageList.length > 1 && (
        <div className="mt-3 sm:mt-4">
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3">
            {imageList.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-resortGreen focus:ring-offset-2"
                style={{
                  borderColor: activeImage === idx ? "#127541" : "transparent",
                  transform: activeImage === idx ? "scale(0.95)" : "scale(1)",
                }}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 20vw, (max-width: 1024px) 15vw, 10vw"
                />
                {/* Active indicator */}
                {activeImage === idx && (
                  <div className="absolute inset-0 bg-resortGreen/5 border-2 border-resortGreen rounded-lg"></div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200"></div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

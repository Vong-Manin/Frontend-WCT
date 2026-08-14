"use client";

import Image from "next/image";
import { useResortContent } from "@/app/components/providers/ResortContentProvider";

export default function Gallery() {
  const { gallery } = useResortContent();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-resortGreen block">
            Visual Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Our Resort Gallery
          </h2>
        </div>
      </div>

      {/* Responsive Gallery Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl aspect-square shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 group relative"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={600}
              height={600}
              className="w-full h-full object-cover transform group-hover:scale-105 duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-[10px] text-white tracking-wider font-semibold uppercase">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

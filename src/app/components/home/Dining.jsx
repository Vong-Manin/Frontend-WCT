"use client";

import Image from "next/image";
import Link from "next/link";
import { useResortContent } from "@/app/components/providers/ResortContentProvider";

export default function Dining() {
  const { dining } = useResortContent();
  // Get only first 3 dining items
  const featuredDining = dining.slice(0, 3);

  const getMenuText = (id, title) => {
    if (id === 1 || title.toLowerCase().includes("breakfast")) {
      return (
        <>
          <i className="fa-solid fa-mug-saucer mr-1"></i> Breakfast Menu
        </>
      );
    } else if (
      id === 3 ||
      title.toLowerCase().includes("drink") ||
      title.toLowerCase().includes("cocktail")
    ) {
      return (
        <>
          <i className="fa-solid fa-martini-glass-citrus mr-1"></i> Cocktail
          Menu
        </>
      );
    } else {
      return (
        <>
          <i className="fa-solid fa-utensils mr-1"></i> Dinner Menu
        </>
      );
    }
  };

  return (
    <section className="relative bg-white dark:bg-slate-950 py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-resortGreen/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-200/10 dark:bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <span className="w-6 sm:w-8 h-0.5 bg-resortGreen/50"></span>
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-resortGreen">
              Delicious Dining
            </span>
            <span className="w-6 sm:w-8 h-0.5 bg-resortGreen/50"></span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
            A Taste to <span className="text-resortGreen">Remember</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 sm:mt-3 max-w-xl mx-auto px-4">
            From coastal delicacies to masterfully crafted international items
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
            <div className="w-10 sm:w-16 h-0.5 bg-gradient-to-r from-resortGreen/30 via-resortGreen to-resortGreen/30 rounded-full"></div>
          </div>
        </div>

        {/* Cards Grid - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {featuredDining.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-resortGreen/20 transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-3 border border-slate-100/30 dark:border-slate-800/50 flex flex-col"
            >
              {/* Green Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-resortGreen transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* Type Badge */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 bg-resortGreen/90 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg border border-resortGreen/30 flex items-center gap-1 sm:gap-1.5">
                {item.id === 1 && (
                  <>
                    <i className="fa-solid fa-mug-saucer text-[8px] sm:text-[10px] text-white"></i>
                    <span className="text-[6px] sm:text-[8px] font-bold text-white uppercase tracking-wider">
                      Breakfast
                    </span>
                  </>
                )}
                {item.id === 2 && (
                  <>
                    <i className="fa-solid fa-wine-glass text-[8px] sm:text-[10px] text-white"></i>
                    <span className="text-[6px] sm:text-[8px] font-bold text-white uppercase tracking-wider">
                      Dinner
                    </span>
                  </>
                )}
                {item.id === 3 && (
                  <>
                    <i className="fa-solid fa-martini-glass-citrus text-[8px] sm:text-[10px] text-white"></i>
                    <span className="text-[6px] sm:text-[8px] font-bold text-white uppercase tracking-wider">
                      Cocktails
                    </span>
                  </>
                )}
              </div>

              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3] flex-shrink-0">
                <Image
                  src={item.image?.url || "/image/placeholder.jpg"}
                  alt={item.image?.alternativeText || item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Time Badge */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg border border-resortGreen/20 flex items-center gap-1 sm:gap-2">
                  <i className="fa-regular fa-clock text-[8px] sm:text-[10px] text-resortGreen"></i>
                  <span className="text-[6px] sm:text-[8px] font-bold text-resortGreen uppercase tracking-wider">
                    {item.time}
                  </span>
                </div>

                {/* Icon Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-7xl opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  {item.id === 3 && (
                    <i className="fa-solid fa-martini-glass-citrus text-resortGreen"></i>
                  )}
                  {item.id === 1 && (
                    <i className="fa-solid fa-mug-saucer text-resortGreen"></i>
                  )}
                  {item.id === 2 && (
                    <i className="fa-solid fa-wine-glass text-resortGreen"></i>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3 flex-1 flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] sm:text-[10px] font-bold text-resortGreen uppercase tracking-wider bg-resortGreen/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white group-hover:text-resortGreen transition-colors flex items-center gap-1.5 sm:gap-2">
                  {item.title}
                  {item.id === 3 && (
                    <i className="fa-solid fa-martini-glass-citrus text-xs sm:text-sm text-resortGreen"></i>
                  )}
                  {item.id === 1 && (
                    <i className="fa-solid fa-mug-saucer text-xs sm:text-sm text-resortGreen"></i>
                  )}
                  {item.id === 2 && (
                    <i className="fa-solid fa-wine-glass text-xs sm:text-sm text-resortGreen"></i>
                  )}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed flex-1">
                  {item.description}
                </p>
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-400">
                    {item.id === 3 ? (
                      <>
                        <i className="fa-solid fa-martini-glass-citrus text-xs sm:text-sm text-resortGreen"></i>
                        <span>Handcrafted</span>
                      </>
                    ) : item.id === 1 ? (
                      <>
                        <i className="fa-solid fa-mug-saucer text-xs sm:text-sm text-resortGreen"></i>
                        <span>Fresh Brew</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-utensils text-xs sm:text-sm text-resortGreen"></i>
                        <span>Fresh Catch</span>
                      </>
                    )}
                  </div>
                  <Link
                    href="/restaurant"
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-resortGreen hover:text-resortGreen-dark transition-colors group/btn"
                  >
                    <span>{getMenuText(item.id, item.title)}</span>
                    <i className="fa-solid fa-arrow-right text-[10px] sm:text-xs transform group-hover/btn:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-12 lg:mt-16">
          <Link
            href="/restaurant"
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2.5 sm:py-4 bg-resortGreen hover:bg-resortGreen-dark text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:shadow-resortGreen/30 transform hover:-translate-y-1 text-[10px] sm:text-sm tracking-wide"
          >
            <span>Explore Full Menu</span>
            <i className="fa-solid fa-arrow-right text-[10px] sm:text-sm transform group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useResortContent } from "@/app/components/providers/ResortContentProvider";

export default function RestaurantHero() {
  const { restaurantHero } = useResortContent();

  return (
    <section className="relative min-h-[50vh] sm:min-h-[55vh] lg:min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              restaurantHero?.image?.url
                ? `url("${restaurantHero.image.url}")`
                : undefined,
            backgroundPosition: "center 40%",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/50 to-slate-900/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/30"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-resortGreen/20 backdrop-blur-sm text-white/90 text-[8px] sm:text-[10px] lg:text-xs font-medium px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/20 shadow-sm mx-auto">
            <i className="fas fa-utensils text-amber-200/80"></i>
            <span>culinary excellence</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] font-serif drop-shadow-lg">
            A Taste of <br className="hidden sm:block" />
            <span className="text-resortGreen-light italic">Paradise</span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm lg:text-lg text-slate-100/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md px-2 sm:px-0">
            From coastal delicacies to masterfully crafted international items,
            experience dining absolute at Khyal Samut Resort.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 lg:gap-4 pt-1 sm:pt-2 text-slate-200/80 text-[8px] sm:text-[10px] lg:text-sm font-light">
            <span className="flex items-center gap-1 sm:gap-1.5">
              <i className="fas fa-check-circle text-emerald-300/80"></i>
              <span className="hidden xs:inline">fresh ingredients</span>
              <span className="xs:hidden">fresh</span>
            </span>
            <span className="hidden xs:inline-block w-px h-3 sm:h-4 lg:h-5 bg-white/20"></span>
            <span className="flex items-center gap-1 sm:gap-1.5">
              <i className="fas fa-star text-amber-300/80"></i>
              <span>4.8 · 500+ reviews</span>
            </span>
            <span className="hidden xs:inline-block w-px h-3 sm:h-4 lg:h-5 bg-white/20"></span>
            <span className="flex items-center gap-1 sm:gap-1.5">
              <i className="fas fa-clock text-sky-300/80"></i>
              <span>6:00 AM - 11:00 PM</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useResortContent } from "@/app/components/providers/ResortContentProvider";

export default function Activities() {
  const { activities } = useResortContent();
  // Only show first 3 activities
  const displayedActivities = activities.slice(0, 3);

  return (
    <section className="relative bg-gradient-to-b from-teal-50/30 via-white to-amber-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[800px] h-[300px] sm:h-[500px] lg:h-[800px] bg-gradient-to-r from-teal-200/5 to-amber-200/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Matching Rooms Component Style */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="w-4 sm:w-8 h-0.5 bg-resortGreen/50"></span>
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-resortGreen">
              Curated Experiences
            </span>
            <span className="w-4 sm:w-8 h-0.5 bg-resortGreen/50"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif text-slate-900 dark:text-white">
            Activities at the <span className="text-resortGreen">Resort</span>
            <span className="text-xl sm:text-2xl lg:text-3xl ml-1 sm:ml-2">
              🏝️
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 sm:mt-3 max-w-md mx-auto px-4">
            Discover unforgettable experiences crafted for every traveler
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
            <div className="w-10 sm:w-16 h-1 bg-gradient-to-r from-resortGreen/30 via-resortGreen to-resortGreen/30 rounded-full"></div>
          </div>
        </div>

        {/* Cards Grid - Exactly 3 cards in one row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {displayedActivities.map((activity) => (
            <div
              key={activity.id}
              className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-resortGreen/20 transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:rotate-0 sm:hover:rotate-1 border border-white/20 dark:border-slate-800/50"
            >
              {/* Decorative element */}
              <div className="absolute -top-8 sm:-top-10 -right-8 sm:-right-10 w-16 sm:w-20 h-16 sm:h-20 bg-resortGreen/10 rounded-full blur-xl sm:blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative">
                {/* Image Section */}
                <Link href={`/activities/${activity.id}`}>
                  <div className="overflow-hidden aspect-[4/3] cursor-pointer">
                    <Image
                      src={activity.image?.url || "/image/placeholder.jpg"}
                      alt={activity.image?.alternativeText || activity.heading}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {activity.popular && (
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg border border-resortGreen/20">
                        <span className="text-[7px] sm:text-[8px] font-bold text-resortGreen uppercase tracking-wider flex items-center gap-1">
                          <span className="text-yellow-400 text-[8px] sm:text-[10px]">
                            ★
                          </span>
                          Popular
                        </span>
                      </div>
                    )}
                    {/* Category Badge - HIDDEN */}
                    {/* <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-resortGreen px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg">
                      <span className="text-[7px] sm:text-[9px] font-bold text-white uppercase tracking-wider">
                        {activity.title}
                      </span>
                    </div> */}
                  </div>
                </Link>

                {/* Content Section */}
                <div className="p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3">
                  <Link href={`/activities/${activity.id}`}>
                    <h3 className="text-base sm:text-lg lg:text-xl font-serif text-slate-900 dark:text-white hover:text-resortGreen transition-colors cursor-pointer">
                      {activity.heading}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {activity.description}
                  </p>

                  {/* Activity details - Category tag removed */}
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>⏱️ {activity.duration || "2-3 hours"}</span>
                    <span>👤 Up to {activity.guests || 10}</span>
                  </div>

                  {/* Join the Fun Button */}
                  <Link
                    href={`/activities/${activity.id}`}
                    className="w-full py-2.5 sm:py-3 bg-resortGreen hover:bg-resortGreen-dark text-white rounded-full text-xs sm:text-sm font-medium transition-all shadow-lg hover:shadow-resortGreen/30 flex items-center justify-center gap-2 group/btn block text-center"
                  >
                    <span>Join the Fun</span>
                    <i className="fa-solid fa-arrow-right text-[10px] sm:text-xs transform group-hover/btn:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm">🌺</span>
            <span className="w-8 sm:w-12 h-0.5 bg-resortGreen/30"></span>
            <span className="text-xs sm:text-sm">🌴</span>
            <span className="w-8 sm:w-12 h-0.5 bg-resortGreen/30"></span>
            <span className="text-xs sm:text-sm">🌺</span>
          </div>
          <Link
            href="/activities"
            className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2.5 sm:py-4 bg-resortGreen hover:bg-resortGreen-dark text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:shadow-resortGreen/30 transform hover:-translate-y-1 text-[10px] sm:text-sm tracking-wide"
          >
            <span>View All Activities</span>
            <i className="fa-solid fa-arrow-right text-[10px] sm:text-xs transform group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(var(--rotation, 0deg));
          }
          50% {
            transform: translateY(-8px) rotate(var(--rotation, 0deg));
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
          --rotation: 12deg;
        }
        .animate-float-delay {
          animation: float 6s ease-in-out infinite 3s;
          --rotation: -12deg;
        }
      `}</style>
    </section>
  );
}

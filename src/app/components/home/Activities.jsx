"use client";

import Image from "next/image";
import Link from "next/link";
import { activities } from "../../data/activities";

export default function Activities() {
  return (
    <section className="relative bg-white dark:bg-slate-950 py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Background blur - responsive */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-gradient-to-r from-resortGreen/5 to-emerald-200/5 rounded-full blur-3xl"></div>

        {/* Subtle Wave Pattern at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 opacity-5">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 60L60 50C120 40 240 20 360 30C480 40 600 80 720 85C840 90 960 60 1080 50C1200 40 1320 50 1380 55L1440 60V120H0V60Z"
              fill="#127541"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Icons instead of emojis */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <i className="fa-solid fa-palm-tree text-base sm:text-2xl text-resortGreen"></i>
            <span className="w-6 sm:w-12 h-0.5 bg-resortGreen/50"></span>
            <span className="text-[8px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-resortGreen">
              Curated Experiences
            </span>
            <span className="w-6 sm:w-12 h-0.5 bg-resortGreen/50"></span>
            <i className="fa-solid fa-palm-tree text-base sm:text-2xl text-resortGreen"></i>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">
            Activities at the <br />
            <span className="text-resortGreen">Resort</span>
            <i className="fa-solid fa-umbrella-beach text-xl sm:text-3xl ml-1 sm:ml-2 text-resortGreen"></i>
          </h2>
          <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-light mt-2 sm:mt-4 px-4">
            Discover unforgettable experiences crafted for every traveler
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
            <div className="w-12 sm:w-20 h-1 bg-gradient-to-r from-resortGreen/30 via-resortGreen to-resortGreen/30 rounded-full"></div>
          </div>
        </div>

        {/* Cards Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-resortGreen/20 transition-all duration-500 hover:-translate-y-2 border border-slate-100 dark:border-slate-800"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <Image
                  src={activity.image}
                  alt={activity.heading}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400/127541/FFFFFF?text=Activity";
                  }}
                />
                {/* Badge with Icon - Responsive */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full shadow-lg border border-resortGreen/10">
                  <span className="text-[8px] sm:text-[10px] font-bold text-resortGreen flex items-center gap-1">
                    <i className="fa-solid fa-star text-[8px] sm:text-[10px] text-yellow-400"></i>
                    {activity.number}
                  </span>
                </div>
                {/* Category Tag - Responsive */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-resortGreen px-2 sm:px-3 py-1 rounded-full shadow-lg flex items-center gap-1 sm:gap-1.5">
                  <span className="text-[6px] sm:text-[8px] font-bold text-white uppercase tracking-wider">
                    {activity.title}
                  </span>
                </div>
                {/* Decorative Corner */}
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-white/20 text-base sm:text-xl group-hover:text-white/40 transition-colors">
                  <span>✦</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white group-hover:text-resortGreen transition-colors flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm">
                    {activity.id === 1 && (
                      <i className="fa-solid fa-water text-resortGreen"></i>
                    )}
                    {activity.id === 2 && (
                      <i className="fa-solid fa-water-ladder text-resortGreen"></i>
                    )}
                    {activity.id === 3 && (
                      <i className="fa-solid fa-ship text-resortGreen"></i>
                    )}
                  </span>
                  {activity.heading}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-400">
                    <i className="fa-regular fa-clock"></i>
                    <span>2-3 hours</span>
                    <span className="mx-0.5 sm:mx-1">•</span>
                    <i className="fa-solid fa-leaf text-resortGreen text-xs sm:text-sm"></i>
                  </div>
                  <Link
                    href={`/activities/${activity.id}`}
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-resortGreen hover:text-resortGreen-dark transition-colors group/btn"
                  >
                    <span>Join the Fun</span>
                    <i className="fa-solid fa-arrow-right text-[10px] sm:text-xs transform group-hover/btn:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - Responsive */}
        <div className="text-center pt-12 sm:pt-16 lg:pt-20">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <i className="fa-solid fa-palm-tree text-xs sm:text-base text-resortGreen/50"></i>
            <span className="w-8 sm:w-12 h-0.5 bg-resortGreen/30"></span>
            <i className="fa-solid fa-umbrella-beach text-xs sm:text-base text-resortGreen/50"></i>
            <span className="w-8 sm:w-12 h-0.5 bg-resortGreen/30"></span>
            <i className="fa-solid fa-palm-tree text-xs sm:text-base text-resortGreen/50"></i>
          </div>
          <Link
            href="/activities"
            className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2.5 sm:py-4 bg-resortGreen hover:bg-resortGreen-dark text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:shadow-resortGreen/30 transform hover:-translate-y-1 text-[10px] sm:text-sm tracking-wide"
          >
            <span>View All Activities</span>
            <i className="fa-solid fa-arrow-right text-[10px] sm:text-sm transform group-hover:translate-x-1 transition-transform"></i>
            <i className="fa-solid fa-palm-tree text-xs sm:text-base"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

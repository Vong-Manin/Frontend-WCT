"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useResortContent } from "@/app/components/providers/ResortContentProvider";

export default function Rooms() {
  const { rooms } = useResortContent();
  //  Only show first 3 rooms (one full row)
  const displayedRooms = rooms.slice(0, 3);

  return (
    <>
      <section className="relative bg-gradient-to-b from-teal-50/30 via-white to-amber-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[800px] h-[300px] sm:h-[500px] lg:h-[800px] bg-gradient-to-r from-teal-200/5 to-amber-200/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="w-4 sm:w-8 h-0.5 bg-resortGreen/50"></span>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-resortGreen">
                Your Paradise Awaits
              </span>
              <span className="w-4 sm:w-8 h-0.5 bg-resortGreen/50"></span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif text-slate-900 dark:text-white">
              Our <span className="text-resortGreen">Rooms</span>
              <span className="text-xl sm:text-2xl lg:text-3xl ml-1 sm:ml-2">
                🏝️
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 sm:mt-3 max-w-md mx-auto px-4">
              Choose your perfect escape
            </p>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
              <div className="w-10 sm:w-16 h-1 bg-gradient-to-r from-resortGreen/30 via-resortGreen to-resortGreen/30 rounded-full"></div>
            </div>
          </div>

          {/* Exactly 3 cards - one row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {displayedRooms.map((room) => (
              <div
                key={room.id}
                className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-resortGreen/20 transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:rotate-0 sm:hover:rotate-1 border border-white/20 dark:border-slate-800/50"
              >
                <div className="absolute -top-8 sm:-top-10 -right-8 sm:-right-10 w-16 sm:w-20 h-16 sm:h-20 bg-resortGreen/10 rounded-full blur-xl sm:blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative">
                  {/* ✅ Image - Clickable to detail page */}
                  <Link href={`/detail-room/${room.id}`}>
                    <div className="overflow-hidden aspect-[4/3] cursor-pointer">
                      <Image
                        src={room.images?.[0]?.url || "/image/placeholder.jpg"}
                        alt={room.images?.[0]?.alternativeText || room.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {room.popular && (
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg border border-resortGreen/20">
                          <span className="text-[7px] sm:text-[8px] font-bold text-resortGreen uppercase tracking-wider flex items-center gap-1">
                            <span className="text-yellow-400 text-[8px] sm:text-[10px]">
                              ★
                            </span>{" "}
                            Popular
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3">
                    {/* Title - Clickable to detail page */}
                    <Link href={`/detail-room/${room.id}`}>
                      <h3 className="text-base sm:text-lg lg:text-xl font-serif text-slate-900 dark:text-white hover:text-resortGreen transition-colors cursor-pointer">
                        {room.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl font-bold text-resortGreen">
                        ${room.price}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400">
                        / night
                      </span>
                    </div>

                    {/* "Book Now" button moves to Booking page */}
                    <Link
                      href={`/booking?room=${room.id}`}
                      className="w-full py-2.5 sm:py-3 bg-resortGreen hover:bg-resortGreen-dark text-white rounded-full text-xs sm:text-sm font-medium transition-all shadow-lg hover:shadow-resortGreen/30 flex items-center justify-center gap-2 group/btn block text-center"
                    >
                      <span>Book Now</span>
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
              href="/rooms"
              className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2.5 sm:py-4 bg-resortGreen hover:bg-resortGreen-dark text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:shadow-resortGreen/30 transform hover:-translate-y-1 text-[10px] sm:text-sm tracking-wide"
            >
              <span>View All Rooms</span>
              <i className="fa-solid fa-arrow-right text-[10px] sm:text-xs transform group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </div>
        </div>
      </section>

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
    </>
  );
}

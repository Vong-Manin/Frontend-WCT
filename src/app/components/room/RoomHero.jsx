"use client";

import RoomSearch from "./RoomSearch";
import { useResortContent } from "@/app/components/providers/ResortContentProvider";

export default function RoomHero({
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  roomsCount,
  setRoomsCount,
  onSearch,
}) {
  const { roomHero } = useResortContent();

  return (
    <section className="relative min-h-[55vh] sm:min-h-[65vh] lg:min-h-[80vh] flex items-center justify-center overflow-visible pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 lg:pb-28 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              roomHero?.image?.url ? `url("${roomHero.image.url}")` : undefined,
            backgroundPosition: "center 30%",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/50 to-slate-900/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/30"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center h-full">
        <div className="max-w-2xl text-center sm:text-left mx-auto sm:mx-0 space-y-2 sm:space-y-3 lg:space-y-4 mb-6 sm:mb-8 lg:mb-14">
          <div className="inline-flex items-center gap-2 bg-resortGreen/20 backdrop-blur-sm text-white/90 text-[8px] sm:text-[10px] lg:text-xs font-medium px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-full border border-white/20 shadow-sm mx-auto sm:mx-0">
            <i className="fas fa-spa text-amber-200/80 text-[8px] sm:text-[10px] lg:text-xs"></i>
            <span>exclusive retreat</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] font-serif drop-shadow-lg">
            Find your
            <br className="hidden sm:block" />
            <span className="text-resortGreen-light italic">
              perfect escape
            </span>
          </h1>

          <p className="text-xs sm:text-sm lg:text-xl text-slate-100/90 font-light max-w-lg mx-auto sm:mx-0 leading-relaxed drop-shadow-md px-2 sm:px-0">
            Immerse yourself in tranquility. Choose your room, select your
            dates, and let us craft an unforgettable stay.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 lg:gap-4 pt-1 sm:pt-2 text-slate-200/80 text-[8px] sm:text-[10px] lg:text-sm font-light">
            <span className="flex items-center gap-1 sm:gap-1.5">
              <i className="fas fa-check-circle text-emerald-300/80 text-[8px] sm:text-[10px] lg:text-sm"></i>
              <span className="hidden xs:inline">best rate guaranteed</span>
              <span className="xs:hidden">best rate</span>
            </span>
            <span className="hidden xs:inline-block w-px h-3 sm:h-4 lg:h-5 bg-white/20"></span>
            <span className="flex items-center gap-1 sm:gap-1.5">
              <i className="fas fa-star text-amber-300/80 text-[8px] sm:text-[10px] lg:text-sm"></i>
              <span>
                4.9 · <span className="hidden xs:inline">1200+</span> reviews
              </span>
            </span>
          </div>
        </div>

        <div className="w-full max-w-4xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl border border-white/20 dark:border-slate-700/50 transition-all transform translate-y-4 sm:translate-y-6 md:translate-y-8 lg:translate-y-12">
          <RoomSearch
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            guests={guests}
            setGuests={setGuests}
            roomsCount={roomsCount}
            setRoomsCount={setRoomsCount}
            onSearch={onSearch}
          />
        </div>
      </div>
    </section>
  );
}

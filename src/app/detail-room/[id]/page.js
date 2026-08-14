"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useResortContent } from "@/app/components/providers/ResortContentProvider";
import RoomGallery from "@/app/components/detail-room/RoomGallery";
import RoomInfo from "@/app/components/detail-room/RoomInfo";
import CheckInCheckOut from "@/app/components/detail-room/CheckIn-CheckOut";
import RoomReviews from "@/app/components/detail-room/RoomReviews";

export default function RoomDetailPage() {
  const { rooms, isLoading } = useResortContent();
  const params = useParams();
  const id = params.id;
  const room = id ? rooms.find((candidate) => candidate.id === Number(id)) : null;
  const loading = isLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-resortGreen/20 border-t-resortGreen rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 dark:text-slate-400 mt-4">
            Loading room details...
          </p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fa-regular fa-face-frown text-6xl text-slate-300 dark:text-slate-700 mb-4 block"></i>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Room Not Found
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            The room you're looking for doesn't exist.
          </p>
          <Link
            href="/rooms"
            className="mt-6 inline-block bg-resortGreen text-white px-6 py-3 rounded-xl hover:bg-resortGreen-dark transition-colors"
          >
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  // Configuration for overlap amount - adjust these values
  const overlapConfig = {
    mobile: "mt-[-1.5rem]", // -mt-6 (24px)
    tablet: "mt-[-2.5rem]", // -mt-10 (40px)
    desktop: "mt-[-4rem]", // -mt-16 (64px)
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 hover:text-resortGreen transition-colors group"
        >
          <i className="fa-solid fa-arrow-left text-xs transform group-hover:-translate-x-1 transition-transform"></i>
          <span>Back to Rooms</span>
        </Link>
      </div>

      {/* Hero Section - Taller for better overlap effect */}
      <div className="relative h-[45vh] sm:h-[55vh] lg:h-[70vh] overflow-hidden mt-2 sm:mt-3">
        <Image
          src={room.images?.[0]?.url || "/image/placeholder.jpg"}
          alt={room.images?.[0]?.alternativeText || room.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>

        {/* Title Overlay with more bottom padding for better overlap */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              {room.category && (
                <span
                  className={`text-[8px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg ${
                    room.category === "suite"
                      ? "bg-purple-500/80 text-white"
                      : room.category === "villa"
                        ? "bg-emerald-500/80 text-white"
                        : room.category === "family"
                          ? "bg-blue-500/80 text-white"
                          : room.category === "luxury"
                            ? "bg-amber-500/80 text-white"
                            : "bg-slate-500/80 text-white"
                  }`}
                >
                  <i className="fa-solid fa-tag mr-1"></i>
                  {room.category.charAt(0).toUpperCase() +
                    room.category.slice(1)}
                </span>
              )}
              {room.popular && (
                <span className="bg-rose-500 text-white text-[8px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg">
                  ★ Popular
                </span>
              )}
              <span className="bg-white/20 backdrop-blur-sm text-white text-[8px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-1">
                <i
                  className={`${room.viewIcon || "fa-solid fa-tree"} text-${room.viewIconColor || "emerald"}-400`}
                ></i>
                {room.viewType || "Resort View"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white font-serif tracking-tight leading-tight">
              {room.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 sm:mt-2 text-white/80">
              <span className="flex items-center gap-1 text-xs sm:text-sm">
                <i className="fa-solid fa-star text-amber-400 text-xs sm:text-sm"></i>
                <span className="font-bold">{room.rating}</span>
                <span className="text-[10px] sm:text-xs text-white/60">
                  ({room.reviews} reviews)
                </span>
              </span>
              <span className="hidden xs:block w-px h-4 sm:h-5 bg-white/20"></span>
              <span className="flex items-center gap-1 text-xs sm:text-sm">
                <i className="fa-regular fa-user text-xs sm:text-sm"></i>
                <span>Max {room.maxGuests}</span>
              </span>
              <span className="hidden xs:block w-px h-4 sm:h-5 bg-white/20"></span>
              <span className="flex items-center gap-1 text-xs sm:text-sm">
                <i className="fa-solid fa-maximize text-xs sm:text-sm"></i>
                <span>{room.size}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Custom overlap for each device */}
      <div
        className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 pb-8 sm:pb-12 lg:pb-16 ${overlapConfig.mobile} sm:${overlapConfig.tablet} lg:${overlapConfig.desktop}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
          {/* Left Column - Gallery & Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Gallery with background to make it stand out */}
            <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
              <RoomGallery images={room.images} title={room.title} />
            </div>
            <RoomInfo room={room} />
            <RoomReviews
              roomId={room.id}
              rating={room.rating}
              ratingLabel={room.ratingLabel}
              reviews={room.reviews}
            />
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <CheckInCheckOut room={room} />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Rooms */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 font-serif">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {rooms
            .filter((r) => r.id !== room.id && r.category === room.category)
            .slice(0, 3)
            .map((similarRoom) => (
              <Link
                key={similarRoom.id}
                href={`/detail-room/${similarRoom.id}`}
                className="group bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-resortGreen/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={similarRoom.images?.[0]?.url || "/image/placeholder.jpg"}
                    alt={similarRoom.images?.[0]?.alternativeText || similarRoom.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 sm:p-4 lg:p-5">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-resortGreen transition-colors line-clamp-1">
                    {similarRoom.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1.5 sm:mt-2">
                    <span className="text-base sm:text-lg font-bold text-resortGreen">
                      ${similarRoom.price}
                      <span className="text-[10px] sm:text-xs font-normal text-slate-400">
                        /night
                      </span>
                    </span>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <i className="fa-solid fa-star text-amber-400 text-xs"></i>
                      {similarRoom.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

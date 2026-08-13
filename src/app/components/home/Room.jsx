"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/strapi";

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRooms() {
      try {
        // កែត្រង់នេះ៖ ប្តូរពី /api/Room ទៅ /api/rooms ព្រោះ Folder របស់អ្នកឈ្មោះ rooms
        const response = await fetch("/api/rooms");
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else if (data.data) {
          setRooms(data.data);
        } else {
          setError("No rooms data received");
        }
      } catch (err) {
        setError("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  const displayedRooms = rooms.slice(0, 3);

  if (loading) {
    return (
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl text-resortGreen">Loading rooms...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500">
            Unable to load rooms. Please try again later.
          </p>
          <p className="text-sm text-gray-500 mt-2">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (rooms.length === 0) {
    return (
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">No rooms available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-teal-50/30 via-white to-amber-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[800px] h-[300px] sm:h-[500px] lg:h-[800px] bg-gradient-to-r from-teal-200/5 to-amber-200/5 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif text-slate-900 dark:text-white">
            Our <span className="text-resortGreen">Rooms</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {displayedRooms.map((room) => {
            const imageUrl = room.featuredImage;
            return (
              <div
                key={room.documentId || room.id}
                className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-resortGreen/20 transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-4 border border-white/20 dark:border-slate-800/50"
              >
                <div className="relative">
                  <Link href={`/rooms/${room.documentId}`}>
                    <div className="overflow-hidden aspect-[4/3] cursor-pointer relative">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={room.title || "Room image"}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          unoptimized={true}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3">
                    <Link href={`/rooms/${room.documentId}`}>
                      <h3 className="text-base sm:text-lg lg:text-xl font-serif text-slate-900 dark:text-white hover:text-resortGreen transition-colors cursor-pointer">
                        {room.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl font-bold text-resortGreen">
                        {room.price ? formatPrice(Number(room.price)) : "$0.00"}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400">
                        / night
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      {room.maxGuests && (
                        <span>👤 {room.maxGuests} guests</span>
                      )}
                      {room.bedType && <span>🛏️ {room.bedType}</span>}
                    </div>
                    <Link
                      href={`/booking?room=${room.documentId}`}
                      className="w-full py-2.5 sm:py-3 bg-resortGreen hover:bg-resortGreen-dark text-white rounded-full text-xs sm:text-sm font-medium transition-all shadow-lg flex items-center justify-center gap-2 block text-center"
                    >
                      <span>Book Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

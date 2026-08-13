// src/app/activities/page.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  activities,
  categories,
  getActivitiesByCategory,
} from "@/app/data/activities";
import ActivityCard from "@/app/components/activities/ActivityCard";
import FilterButtons from "@/app/components/activities/FilterButtons";
import BookingModal from "@/app/components/activities/BookingModal";
import SuccessToast from "@/app/components/activities/SuccessToast";

export default function ActivitiesPage() {
  // ALL STATE DECLARATIONS MUST BE HERE
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter activities when filter changes
  useEffect(() => {
    try {
      setIsLoading(true);
      const result = getActivitiesByCategory(selectedFilter);
      setFilteredActivities(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Error filtering activities:", error);
      setFilteredActivities([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFilter]);

  const handleFilterChange = (filterId) => {
    setSelectedFilter(filterId);
  };

  const handleBookClick = (activity) => {
    if (activity) {
      setSelectedActivity(activity);
      setIsModalOpen(true);
    }
  };

  const handleModalConfirm = (bookingData) => {
    setIsModalOpen(false);
    setToastMessage(
      `Your booking for "${bookingData.activity}" with ${bookingData.guests} guest(s) on ${bookingData.date} has been confirmed!`,
    );
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleToastClose = () => {
    setToastMessage(null);
  };

  // Get featured activity for hero
  const featuredActivity =
    activities && activities.length > 0 ? activities[0] : null;

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-resortGreen border-t-transparent"></div>
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Loading activities...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-resortGreen/10 text-resortGreen text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-resortGreen/20">
                  <i className="fa-solid fa-spa text-resortGreen"></i>
                  Curated Experiences
                </span>
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs text-slate-400">
                  {activities?.length || 0} Activities
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white font-serif leading-tight">
                Discover Your
                <span className="block text-resortGreen">
                  Perfect Adventure
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                From tranquil wellness retreats to thrilling ocean adventures,
                every experience is crafted to create unforgettable moments.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <Link
                  href="#activities-grid"
                  className="bg-resortGreen hover:bg-resortGreen/90 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all shadow-lg hover:shadow-resortGreen/30 flex items-center gap-2 text-sm sm:text-base"
                >
                  <span>Explore Activities</span>
                  <i className="fa-solid fa-arrow-down text-xs"></i>
                </Link>
                <Link
                  href="/booking"
                  className="border-2 border-slate-200 dark:border-slate-700 hover:border-resortGreen text-slate-700 dark:text-slate-300 hover:text-resortGreen font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all text-sm sm:text-base"
                >
                  <i className="fa-regular fa-calendar-plus mr-2"></i>
                  Plan Your Stay
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-water text-emerald-600 dark:text-emerald-400 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Water Adventures</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {activities?.filter((a) => a.category === "adventure")
                        .length || 0}
                      +
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-spa text-purple-600 dark:text-purple-400 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Wellness</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {activities?.filter((a) => a.category === "wellness")
                        .length || 0}
                      +
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-sailboat text-amber-600 dark:text-amber-400 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Island Cruises</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {activities?.filter((a) => a.category === "cruise")
                        .length || 0}
                      +
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Featured Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={
                    featuredActivity?.image ||
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"
                  }
                  alt="Featured Activity"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 max-w-[200px] shadow-lg border border-white/20">
                  <p className="text-[10px] sm:text-xs text-resortGreen font-semibold uppercase tracking-wider">
                    Featured Experience
                  </p>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {featuredActivity?.heading || "Luxury Experience"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">
                      {featuredActivity?.duration || "2 Hours"}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-xs font-bold text-resortGreen">
                      ${featuredActivity?.price || 99}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-resortGreen/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-20 h-20 sm:w-32 sm:h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="bg-white/50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-resortGreen font-serif">
                {activities?.length || 0}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Total Experiences
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-resortGreen font-serif">
                4.9
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Guest Rating
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-resortGreen font-serif">
                100%+
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Happy Guests
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-resortGreen font-serif">
                🌿
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Eco-Friendly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITIES GRID */}
      <section
        id="activities-grid"
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white font-serif">
              Choose Your Experience
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {filteredActivities.length} experiences available
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <i className="fa-regular fa-circle-check text-resortGreen"></i>
            <span>All activities include professional guidance</span>
          </div>
        </div>

        <FilterButtons
          categories={categories}
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <ActivityCard
                key={activity?.id || `activity-${index}`}
                activity={activity}
                onBook={handleBookClick}
                isPriority={index < 3}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16 sm:py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                <i className="fa-regular fa-compass text-3xl text-slate-400"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                No Experiences Found
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Try adjusting your filters to discover more activities.
              </p>
              <button
                onClick={() => handleFilterChange("all")}
                className="mt-4 text-resortGreen hover:text-resortGreen/80 transition-colors font-medium text-sm"
              >
                View all experiences →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-resortGreen/5 to-emerald-500/5 dark:from-resortGreen/10 dark:to-emerald-500/10 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-resortGreen font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3">
              Ready for Adventure?
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white font-serif">
              Book Your Stay &{" "}
              <span className="text-resortGreen">Experience More</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3 text-sm sm:text-base">
              Combine your activities with a luxurious stay at Khyal Samut
              Resort. Enjoy exclusive packages and special rates for our guests.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
              <Link
                href="/rooms"
                className="bg-resortGreen hover:bg-resortGreen/90 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-resortGreen/30 flex items-center gap-2 text-sm sm:text-base"
              >
                <span>View Rooms</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
              <Link
                href="/booking"
                className="border-2 border-slate-200 dark:border-slate-700 hover:border-resortGreen text-slate-700 dark:text-slate-300 hover:text-resortGreen font-semibold px-6 sm:px-8 py-3 rounded-xl transition-all text-sm sm:text-base"
              >
                <i className="fa-regular fa-calendar-plus mr-2"></i>
                Book Now
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-resortGreen/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* MODALS & TOASTS */}
      <BookingModal
        activity={selectedActivity}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />

      {toastMessage && (
        <SuccessToast message={toastMessage} onClose={handleToastClose} />
      )}
    </div>
  );
}

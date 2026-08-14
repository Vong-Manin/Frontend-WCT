// app/reserve/page.jsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState, useMemo } from "react";
import { useResortContent } from "@/app/components/providers/ResortContentProvider";
import { useAuth, useUser } from "@clerk/nextjs";
import { createTableBooking } from "@/lib/services/bookings";

function ReservePageContent() {
  const { dining } = useResortContent();
  const router = useRouter();
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("restaurant");
  const restaurantName = searchParams.get("name") || "Restaurant";

  const restaurant = dining.find((item) => item.id === Number(restaurantId));

  // Generate time slots based on restaurant operating hours
  const timeSlots = useMemo(() => {
    if (!restaurant?.operatingHours) {
      // Default time slots if no operating hours specified
      return [
        "6:00 AM",
        "7:00 AM",
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
        "7:00 PM",
        "8:00 PM",
        "9:00 PM",
      ];
    }

    const { open, close } = restaurant.operatingHours;
    const slots = [];

    // Parse opening and closing times
    let openHour = parseInt(open.split(":")[0]);
    const openMinute = parseInt(open.split(":")[1] || "0");
    let closeHour = parseInt(close.split(":")[0]);
    const closeMinute = parseInt(close.split(":")[1] || "0");

    // Generate time slots every 30 minutes
    let currentHour = openHour;
    let currentMinute = openMinute;

    while (
      currentHour < closeHour ||
      (currentHour === closeHour && currentMinute < closeMinute)
    ) {
      const hour12 =
        currentHour === 0
          ? 12
          : currentHour > 12
            ? currentHour - 12
            : currentHour;
      const ampm = currentHour >= 12 ? "PM" : "AM";
      const minuteStr = currentMinute === 0 ? "00" : currentMinute;

      slots.push(`${hour12}:${minuteStr} ${ampm}`);

      // Increment by 30 minutes
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentHour += 1;
        currentMinute = 0;
      }
    }

    // If no slots generated, add default slots
    if (slots.length === 0) {
      return [
        "6:00 AM",
        "7:00 AM",
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
        "7:00 PM",
        "8:00 PM",
        "9:00 PM",
      ];
    }

    return slots;
  }, [restaurant]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    specialRequests: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationError, setReservationError] = useState("");
  const [bookingReference, setBookingReference] = useState("");

  useEffect(() => {
    if (!user) return;
    setFormData((current) => ({
      ...current,
      name: user.fullName || user.firstName || current.name,
      email: user.primaryEmailAddress?.emailAddress || current.email,
      phone: user.primaryPhoneNumber?.phoneNumber || current.phone,
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded || !isSignedIn) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent(window.location.href)}`);
      return;
    }
    setIsSubmitting(true);
    setReservationError("");
    try {
      const token = await getToken();
      const booking = await createTableBooking(
        {
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          bookingDate: formData.date,
          bookingTime: formData.time,
          numberOfGuests: Number(formData.guests),
          specialRequest: formData.specialRequests,
          ...(restaurant
            ? {
                menuItem: restaurant.documentId
                  ? { documentId: restaurant.documentId }
                  : { legacyId: restaurant.id },
              }
            : {}),
        },
        token,
      );
      setBookingReference(booking.bookingReference);
      setIsSubmitted(true);
    } catch (error) {
      setReservationError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookMore = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: 2,
      specialRequests: "",
    });
  };

  if (isSubmitted) {
    return (
      <section className="py-16 sm:py-24 min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50/30 via-white to-amber-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white mb-4">
            Table Reserved Successfully!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Your table at <strong>{restaurantName}</strong> has been reserved.
            <br />
            We'll send you a confirmation email shortly.
          </p>
          <div className="bg-white/80 dark:bg-slate-900/80 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong>Restaurant:</strong> {restaurantName}
            </p>
            {restaurant && (
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <strong>Category:</strong> {restaurant.category}
              </p>
            )}
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong>Date:</strong> {formData.date}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong>Time:</strong> {formData.time}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong>Guests:</strong> {formData.guests}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong>Reference:</strong> {bookingReference}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-bold rounded-xl transition-all"
            >
              <i className="fa-solid fa-home"></i>
              <span>Back Home</span>
            </Link>
            <button
              onClick={handleBookMore}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-resortGreen hover:bg-resortGreen-dark text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-resortGreen/30"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Book More Table</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-teal-50/30 via-white to-amber-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="w-4 sm:w-8 h-0.5 bg-resortGreen/50"></span>
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-resortGreen">
              Reserve Your Table
            </span>
            <span className="w-4 sm:w-8 h-0.5 bg-resortGreen/50"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900 dark:text-white">
            Reserve a Table at <br />
            <span className="text-resortGreen">{restaurantName}</span>
          </h2>
          {restaurant && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {restaurant.category} • {restaurant.time}
            </p>
          )}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
            <div className="w-10 sm:w-16 h-1 bg-gradient-to-r from-resortGreen/30 via-resortGreen to-resortGreen/30 rounded-full"></div>
          </div>
        </div>

        {/* Reservation Form */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-white/20 dark:border-slate-800/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-resortGreen transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-resortGreen transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-resortGreen transition-all"
                  placeholder="+1 234 567 890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  name="guests"
                  required
                  min="1"
                  max="20"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-resortGreen transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-resortGreen transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Time *
                </label>
                <select
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-resortGreen transition-all"
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {restaurant && (
                  <p className="text-xs text-slate-400 mt-1">
                    Operating hours: {restaurant.time}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Special Requests
              </label>
              <textarea
                name="specialRequests"
                rows="3"
                value={formData.specialRequests}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-resortGreen transition-all"
                placeholder="Any special requirements, dietary needs, or occasions?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-resortGreen hover:bg-resortGreen-dark disabled:cursor-not-allowed disabled:opacity-60 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-resortGreen/30"
            >
              {isSubmitting ? "Reserving…" : "Reserve Table"}
            </button>

            {reservationError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-300">
                {reservationError}
              </div>
            )}

            <Link
              href="/"
              className="block text-center text-sm text-slate-500 dark:text-slate-400 hover:text-resortGreen transition-colors"
            >
              ← Cancel and go back
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function ReservePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
          <div className="w-12 h-12 border-4 border-resortGreen/20 border-t-resortGreen rounded-full animate-spin" />
        </div>
      }
    >
      <ReservePageContent />
    </Suspense>
  );
}

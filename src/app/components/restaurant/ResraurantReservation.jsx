"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createTableBooking } from "@/lib/services/bookings";

export default function RestaurantReservation() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();
  // Pre-defined time slots from 6:00 AM to 10:00 PM
  const timeSlots = [
    "6:00 AM",
    "6:30 AM",
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
  ];

  // Get today's date for min date attribute
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2 Guests",
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
      router.push(`/sign-in?redirect_url=${encodeURIComponent("/restaurant")}`);
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
          numberOfGuests: Number.parseInt(formData.guests, 10),
          specialRequest: formData.specialRequests,
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

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif mb-4">
            Reservation Confirmed!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Your table has been reserved successfully.
            <br />
            We'll send you a confirmation email shortly.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong>Name:</strong> {formData.name}
            </p>
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
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                date: "",
                time: "",
                guests: "2 Guests",
                specialRequests: "",
              });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-resortGreen hover:bg-resortGreen-dark text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-resortGreen/30"
          >
            <span>Book Another Table</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif">
            Reserve a Table
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Book your dining experience at Khyal Samut Resort
          </p>
          <p className="text-xs text-resortGreen mt-1">
            ⏰ Operating Hours: 6:00 AM - 10:00 PM
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                <i className="fa-regular fa-user mr-1 text-resortGreen"></i>{" "}
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                <i className="fa-regular fa-envelope mr-1 text-resortGreen"></i>{" "}
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                <i className="fa-solid fa-phone mr-1 text-resortGreen"></i>{" "}
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+855 12 345 678"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                <i className="fa-regular fa-calendar mr-1 text-resortGreen"></i>{" "}
                Date *
              </label>
              <input
                type="date"
                name="date"
                required
                min={today}
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                <i className="fa-regular fa-clock mr-1 text-resortGreen"></i>{" "}
                Time *
              </label>
              <select
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
              >
                <option value="">Select Time</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                <i className="fa-regular fa-user-group mr-1 text-resortGreen"></i>{" "}
                Guests *
              </label>
              <select
                name="guests"
                required
                value={formData.guests}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
              >
                <option value="1 Guest">1 Guest</option>
                <option value="2 Guests">2 Guests</option>
                <option value="3 Guests">3 Guests</option>
                <option value="4 Guests">4 Guests</option>
                <option value="5 Guests">5 Guests</option>
                <option value="6 Guests">6 Guests</option>
                <option value="7 Guests">7 Guests</option>
                <option value="8 Guests">8 Guests</option>
                <option value="9 Guests">9 Guests</option>
                <option value="10 Guests">10 Guests</option>
                <option value="10+ Guests">10+ Guests</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              <i className="fa-regular fa-comment mr-1 text-resortGreen"></i>{" "}
              Special Requests
            </label>
            <textarea
              name="specialRequests"
              rows="3"
              placeholder="Any dietary restrictions or special requests..."
              value={formData.specialRequests}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition resize-none"
            ></textarea>
          </div>

          {reservationError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-300">
              {reservationError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-resortGreen hover:bg-resortGreen-dark disabled:cursor-not-allowed disabled:opacity-60 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-resortGreen/30 flex items-center justify-center gap-2 text-sm tracking-wide"
          >
            <i className="fa-regular fa-calendar-check"></i>
            <span>{isSubmitting ? "Reserving…" : "Reserve Table"}</span>
          </button>

          <p className="text-center text-xs text-slate-400 dark:text-slate-500">
            <i className="fa-regular fa-clock mr-1"></i>
            Operating Hours: 6:00 AM - 10:00 PM
          </p>
        </form>
      </div>
    </div>
  );
}

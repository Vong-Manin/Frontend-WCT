"use client";

import { useState } from "react";

export default function RestaurantReservation() {
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
    date: "",
    time: "",
    guests: "2 Guests",
    specialRequests: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation submitted:", formData);
    setIsSubmitted(true);
    // Add API call here to save reservation
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
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                email: "",
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

          <button
            type="submit"
            className="w-full bg-resortGreen hover:bg-resortGreen-dark text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-resortGreen/30 flex items-center justify-center gap-2 text-sm tracking-wide"
          >
            <i className="fa-regular fa-calendar-check"></i>
            <span>Reserve Table</span>
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

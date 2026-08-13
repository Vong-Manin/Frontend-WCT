"use client";

export default function RestaurantReservation() {
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
        </div>

        <form className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                <i className="fa-regular fa-user mr-1 text-resortGreen"></i>{" "}
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                <i className="fa-regular fa-envelope mr-1 text-resortGreen"></i>{" "}
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                <i className="fa-regular fa-calendar mr-1 text-resortGreen"></i>{" "}
                Date
              </label>
              <input
                type="date"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                <i className="fa-regular fa-clock mr-1 text-resortGreen"></i>{" "}
                Time
              </label>
              <select className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition">
                <option>6:00 PM</option>
                <option>6:30 PM</option>
                <option>7:00 PM</option>
                <option>7:30 PM</option>
                <option>8:00 PM</option>
                <option>8:30 PM</option>
                <option>9:00 PM</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                <i className="fa-regular fa-user-group mr-1 text-resortGreen"></i>{" "}
                Guests
              </label>
              <select className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
                <option>5+ Guests</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              <i className="fa-regular fa-comment mr-1 text-resortGreen"></i>{" "}
              Special Requests
            </label>
            <textarea
              rows="3"
              placeholder="Any dietary restrictions or special requests..."
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
        </form>
      </div>
    </div>
  );
}

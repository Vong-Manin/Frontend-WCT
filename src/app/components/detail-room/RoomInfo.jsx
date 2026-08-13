"use client";

export default function RoomInfo({ room }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Description */}
      <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 font-serif">
          About This Room
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {room.description}
        </p>
      </div>

      {/* Features */}
      <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 font-serif">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {(room.features || ["Ocean View", "Private Balcony", "Smart TV"]).map(
            (feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400"
              >
                <i className="fa-solid fa-check-circle text-resortGreen text-xs sm:text-sm"></i>
                <span>{feature}</span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 font-serif">
          Amenities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {(room.amenities || ["WiFi", "Air Conditioning", "Mini Bar"]).map(
            (amenity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400"
              >
                <i className="fa-solid fa-check-circle text-resortGreen text-xs sm:text-sm"></i>
                <span>{amenity}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

export default function RoomCategories({
  categories,
  selectedCategory,
  onSelectCategory,
  totalRooms,
}) {
  return (
    <div className="mb-4 sm:mb-6 lg:mb-8">
      {/* Desktop & Tablet: Wrapped chips */}
      <div className="hidden sm:flex flex-wrap items-center gap-2 sm:gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedCategory === category.id
                ? "bg-resortGreen text-white shadow-lg shadow-resortGreen/30"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-resortGreen/50 hover:shadow-md"
            }`}
          >
            <i className={`${category.icon} text-xs sm:text-sm`}></i>
            <span>{category.label}</span>
            {selectedCategory === category.id && (
              <span className="ml-0.5 sm:ml-1 text-[10px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full">
                {totalRooms}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Mobile: Horizontal scrollable tabs with icons */}
      <div className="sm:hidden flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory -mx-3 px-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex-shrink-0 snap-start flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-[10px] font-medium transition-all min-w-[56px] ${
              selectedCategory === category.id
                ? "bg-resortGreen text-white shadow-lg shadow-resortGreen/30"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
            }`}
          >
            <i className={`${category.icon} text-base sm:text-lg`}></i>
            <span className="text-[9px] leading-tight">
              {category.label.split(" ")[0]}
            </span>
            {selectedCategory === category.id && (
              <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-white dark:bg-slate-700 text-resortGreen dark:text-resortGreen text-[8px] font-bold rounded-full border-2 border-resortGreen">
                {totalRooms > 99 ? "99+" : totalRooms}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

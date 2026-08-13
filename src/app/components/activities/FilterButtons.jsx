// src/app/components/activities/FilterButtons.jsx
"use client";

import { useState } from "react";

export default function FilterButtons({
  categories,
  selectedFilter,
  onFilterChange,
}) {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const getSelectedLabel = () => {
    if (!categories || !Array.isArray(categories)) return "All Experiences";
    const category = categories.find((c) => c.id === selectedFilter);
    return category ? category.label : "All Experiences";
  };

  // Get icon for each category
  const getCategoryIcon = (id) => {
    switch (id) {
      case "all":
        return "fa-solid fa-compass";
      case "wellness":
        return "fa-solid fa-spa";
      case "adventure":
        return "fa-solid fa-water";
      case "cruise":
        return "fa-solid fa-sailboat";
      default:
        return "fa-solid fa-circle";
    }
  };

  // If no categories, don't render
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Desktop: Horizontal buttons */}
      <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 lg:gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onFilterChange(category.id)}
            className={`flex items-center gap-1.5 px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-300 cursor-pointer ${
              selectedFilter === category.id
                ? "bg-resortGreen text-white shadow-md shadow-resortGreen/20 scale-105"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-resortGreen hover:text-white border border-slate-200 dark:border-slate-700 hover:border-resortGreen"
            }`}
          >
            <i className={`${getCategoryIcon(category.id)} text-xs`}></i>
            {category.label}
          </button>
        ))}
      </div>

      {/* Mobile: Dropdown selector */}
      <div className="sm:hidden w-full">
        <button
          onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm"
          aria-expanded={isMobileDropdownOpen}
        >
          <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <i
              className={`${getCategoryIcon(selectedFilter)} text-resortGreen`}
            ></i>
            {getSelectedLabel()}
          </span>
          <i
            className={`fa-solid fa-chevron-${isMobileDropdownOpen ? "up" : "down"} text-xs text-slate-400 transition-transform duration-300`}
          ></i>
        </button>

        {isMobileDropdownOpen && (
          <div className="mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden animate-slide-down">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onFilterChange(category.id);
                  setIsMobileDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-3 ${
                  selectedFilter === category.id
                    ? "bg-resortGreen/10 text-resortGreen font-medium"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                } border-b border-slate-100 dark:border-slate-800 last:border-0`}
              >
                <i
                  className={`${getCategoryIcon(category.id)} ${selectedFilter === category.id ? "text-resortGreen" : "text-slate-400"}`}
                ></i>
                {category.label}
                {selectedFilter === category.id && (
                  <i className="fa-solid fa-check-circle text-resortGreen ml-auto text-xs"></i>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

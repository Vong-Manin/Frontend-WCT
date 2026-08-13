"use client";

import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { dining } from "@/app/data/dining";

export default function RestaurantMenu() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Get unique categories from data
  const categories = [
    "all",
    ...new Set(dining.map((item) => item.category.toLowerCase())),
  ];

  const filteredItems =
    activeCategory === "all"
      ? dining
      : dining.filter((item) => item.category.toLowerCase() === activeCategory);

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all capitalize ${
              activeCategory === category
                ? "bg-resortGreen text-white shadow-md shadow-resortGreen/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {category === "all" ? "All Items" : category}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {filteredItems.map((item) => (
          <RestaurantCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <i className="fa-regular fa-face-frown text-5xl text-slate-300 dark:text-slate-700 mb-4 block"></i>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            No items found in this category
          </p>
        </div>
      )}
    </div>
  );
}

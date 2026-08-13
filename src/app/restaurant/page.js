"use client";

import { useState } from "react";
import RestaurantHero from "@/app/components/restaurant/RestaurantHero";
import RestaurantTabs from "@/app/components/restaurant/RestaurantTabs";
import RestaurantMenu from "@/app/components/restaurant/RestaurantMenu";
import RestaurantGallery from "@/app/components/restaurant/RestaurantGallery";
import RestaurantReservation from "@/app/components/restaurant/ResraurantReservation";
import RestaurantCTA from "@/app/components/restaurant/RestaurantCTA";

export default function RestaurantPage() {
  const [activeTab, setActiveTab] = useState("menu");

  return (
    <>
      {/* 1. Hero Section */}
      <RestaurantHero />

      {/* 2. Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <RestaurantTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* 3. Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === "menu" && <RestaurantMenu />}
        {activeTab === "gallery" && <RestaurantGallery />}
        {activeTab === "reserve" && <RestaurantReservation />}
      </div>

      {/* 4. Call to Action */}
      <RestaurantCTA />
    </>
  );
}

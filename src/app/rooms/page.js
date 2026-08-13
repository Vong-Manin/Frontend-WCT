"use client";

import { useState, useEffect } from "react";
import RoomHero from "@/app/components/room/RoomHero";
import RoomGrid from "@/app/components/room/RoomGrid";
import RoomCategories from "@/app/components/room/RoomCategories";
import { rooms } from "@/app/data/rooms";

export default function RoomsPage() {
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [visibleRooms, setVisibleRooms] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filters, setFilters] = useState({
    budget: 800,
    guests: 2,
    rooms: 1,
  });
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const categories = [
    { id: "all", label: "All Rooms", icon: "fa-solid fa-bed" },
    { id: "suite", label: "Suites", icon: "fa-solid fa-crown" },
    { id: "villa", label: "Villas", icon: "fa-solid fa-house-chimney" },
    { id: "family", label: "Family", icon: "fa-solid fa-users" },
    { id: "luxury", label: "Luxury", icon: "fa-solid fa-gem" },
  ];

  // Filter rooms based on all criteria
  const applyFilters = () => {
    let filtered = rooms;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (room) =>
          room.category?.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    // Filter by budget
    filtered = filtered.filter((room) => room.price <= filters.budget);

    // Filter by guests
    filtered = filtered.filter((room) => room.maxGuests >= filters.guests);

    setFilteredRooms(filtered);
    setVisibleRooms(6);
  };

  // Apply filters whenever they change
  useEffect(() => {
    applyFilters();
  }, [filters, selectedCategory]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      budget: 800,
      guests: 2,
      rooms: 1,
    });
    setSelectedCategory("all");
  };

  const handleLoadMore = () => {
    setVisibleRooms((prev) => prev + 3);
  };

  const handleSearch = (searchData) => {
    // Update filters with search data
    setFilters((prev) => ({
      ...prev,
      guests: searchData.guests,
      rooms: searchData.rooms,
    }));

    // Store the search dates
    setCheckIn(searchData.checkIn);
    setCheckOut(searchData.checkOut);

    // Trigger search animation or feedback
    setSearchTriggered(true);
    setTimeout(() => setSearchTriggered(false), 1000);
  };

  return (
    <>
      <RoomHero
        checkIn={checkIn}
        setCheckIn={setCheckIn}
        checkOut={checkOut}
        setCheckOut={setCheckOut}
        guests={filters.guests}
        setGuests={(val) => handleFilterChange("guests", val)}
        roomsCount={filters.rooms}
        setRoomsCount={(val) => handleFilterChange("rooms", val)}
        onSearch={handleSearch}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-12 relative z-20 pb-12 sm:pb-16 lg:pb-20">
        <RoomCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          totalRooms={filteredRooms.length}
        />

        {/* Show search results message - FIXED: No arrow function in JSX */}
        {searchTriggered && (
          <div className="mb-4 p-3 bg-resortGreen/10 border border-resortGreen/20 rounded-xl text-resortGreen text-sm font-medium animate-fade-in-up">
            <i className="fa-solid fa-check-circle mr-2"></i>
            Search results updated for {filters.guests} guests and{" "}
            {filters.rooms} room{filters.rooms > 1 ? "s" : ""}
          </div>
        )}

        <RoomGrid
          rooms={filteredRooms}
          visibleRooms={visibleRooms}
          onLoadMore={handleLoadMore}
          onClearFilters={handleClearFilters}
          onFilterChange={handleFilterChange}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={filters.guests}
          roomsCount={filters.rooms}
          selectedCategory={selectedCategory}
        />
      </div>
    </>
  );
}

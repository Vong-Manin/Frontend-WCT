// src/app/page.js
"use client";

import Hero from "./components/home/Hero";
import Rooms from "./components/home/Room";
import Activities from "./components/home/Activities";
import Dining from "./components/home/Dining";
import Reviews from "./components/home/Reviews";
import Gallery from "./components/home/Gallery";
import BookingCTA from "./components/home/BookCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Rooms />
      <Activities />
      <Dining />
      <Reviews />
      <Gallery />
      <BookingCTA />
    </>
  );
}

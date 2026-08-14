"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
const ResortContentContext = createContext(null);

const emptyContent = {
  rooms: [],
  activities: [],
  dining: [],
  gallery: [],
  heroSlides: [],
  roomHero: null,
  restaurantHero: null,
  restaurantGallery: [],
};

export function ResortContentProvider({ children }) {
  const [content, setContent] = useState(emptyContent);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/resort-content", { cache: "no-store" })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Live resort content could not be reached.");
        return payload;
      })
      .then((payload) => {
        if (!active) return;
        setContent({ ...emptyContent, ...payload });
        setApiError("");
      })
      .catch((error) => {
        if (active) setApiError(error.message);
      })
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({ ...content, isLoading, apiError }),
    [content, isLoading, apiError],
  );

  return (
    <ResortContentContext.Provider value={value}>
      {apiError && (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 rounded-xl border border-amber-200 bg-amber-50/95 px-4 py-2 text-center text-xs text-amber-800 shadow-lg backdrop-blur dark:border-amber-800 dark:bg-amber-950/95 dark:text-amber-200"
        >
          Live resort content could not be reached. Please try again.
        </div>
      )}
      {children}
    </ResortContentContext.Provider>
  );
}

export function useResortContent() {
  const context = useContext(ResortContentContext);
  if (!context) throw new Error("useResortContent must be used inside ResortContentProvider");
  return context;
}

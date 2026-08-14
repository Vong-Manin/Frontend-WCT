"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { rooms as fallbackRooms } from "@/app/data/rooms";
import { activities as fallbackActivities } from "@/app/data/activities";
import { dining as fallbackDining } from "@/app/data/dining";
import { gallery as fallbackGallery } from "@/app/data/gallery";
import {
  getActivities,
  getGalleryItems,
  getMenuItems,
  getRooms,
} from "@/lib/services/content";

const ResortContentContext = createContext(null);

export function ResortContentProvider({ children }) {
  const [content, setContent] = useState({
    rooms: fallbackRooms,
    activities: fallbackActivities,
    dining: fallbackDining,
    gallery: fallbackGallery,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.allSettled([getRooms(), getActivities(), getMenuItems(), getGalleryItems()])
      .then((results) => {
        if (!active) return;
        const keys = ["rooms", "activities", "dining", "gallery"];
        setContent((current) => {
          const next = { ...current };
          results.forEach((result, index) => {
            if (result.status === "fulfilled" && result.value.length) {
              next[keys[index]] = result.value;
            }
          });
          return next;
        });
        const rejected = results.find((result) => result.status === "rejected");
        setApiError(
          rejected
            ? "Live resort content could not be reached. Showing the preserved local copy."
            : "",
        );
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
          {apiError}
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

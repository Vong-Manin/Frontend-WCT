"use client";

import { useEffect, useState } from "react";
import { getReviews } from "@/lib/services/reviews";

export default function RoomReviews({ roomId, rating, ratingLabel, reviews }) {
  const [showAll, setShowAll] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    let active = true;
    getReviews(null, roomId)
      .then((result) => active && setReviewData(result))
      .catch((error) => active && setReviewError(error.message));
    return () => {
      active = false;
    };
  }, [roomId]);

  const displayedReviews = showAll ? reviewData : reviewData.slice(0, 2);

  const getStarDisplay = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
          Guest Reviews
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex text-amber-400 text-sm">
            {getStarDisplay(Math.round(rating || 4.5))}
          </div>
          <span className="font-bold text-slate-900 dark:text-white">
            {rating || 4.5}
          </span>
          <span className="text-sm text-slate-400">
            ({reviews || 0} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reviewError && (
          <p className="rounded-xl bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
            {reviewError}
          </p>
        )}
        {!reviewError && reviewData.length === 0 && (
          <p className="py-4 text-sm text-slate-500 dark:text-slate-400">
            No guest reviews have been published for this room yet.
          </p>
        )}
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-slate-100 dark:border-slate-800 last:border-0 pb-4 last:pb-0"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-resortGreen/10 text-resortGreen flex items-center justify-center font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <span className="font-medium text-slate-900 dark:text-white text-sm">
                    {review.name}
                  </span>
                  {review.verified && (
                    <span className="ml-2 text-[10px] text-resortGreen font-medium">
                      <i className="fa-solid fa-check-circle"></i> Verified
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs text-slate-400">{review.date}</span>
            </div>
            <div className="flex text-amber-400 text-[10px] mb-1.5">
              {getStarDisplay(review.rating)}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              "{review.comment}"
            </p>
          </div>
        ))}
      </div>

      {reviewData.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-sm font-medium text-resortGreen hover:underline transition-colors"
        >
          {showAll
            ? "Show less reviews"
            : `Show all ${reviewData.length} reviews`}
        </button>
      )}
    </div>
  );
}

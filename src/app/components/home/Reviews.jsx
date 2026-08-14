"use client";

import { useMemo, useState, useEffect } from "react";
import ReviewDrawer from "./ReviewDrawer";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useResortContent } from "@/app/components/providers/ResortContentProvider";
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from "@/lib/services/reviews";

export default function Reviews() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();
  const { rooms } = useResortContent();
  const [reviews, setReviews] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");

  // Fetch reviews on load
  useEffect(() => {
    if (!isLoaded) return;
    let active = true;
    (async () => {
      try {
        const token = isSignedIn ? await getToken() : null;
        const apiReviews = await getReviews(token);
        if (active) {
          setReviews(apiReviews);
          setReviewError("");
        }
      } catch (error) {
        if (active) {
          setReviews([]);
          setReviewError(error.message);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [isLoaded, isSignedIn, getToken]);

  const totalReviews = reviews.length;
  const averageRating = useMemo(
    () =>
      totalReviews
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0,
    [reviews, totalReviews],
  );

  // Add or update review
  const addReview = async (newReview) => {
    setIsSubmitting(true);
    setReviewError("");
    try {
      const token = await getToken();
      if (!token) throw new Error("Please sign in before publishing a review.");
      const selectedRoom = rooms.find((room) => room.title === newReview.roomType);
      const payload = {
        comment: newReview.comment,
        rating: newReview.rating,
        stayDate: newReview.stayDate,
        roomType: newReview.roomType,
        ...(selectedRoom
          ? {
              room: selectedRoom.documentId
                ? { documentId: selectedRoom.documentId }
                : { legacyId: selectedRoom.id },
            }
          : {}),
      };
      if (editingReview) {
        const saved = await updateReview(editingReview.documentId, payload, token);
        setReviews((current) =>
          current.map((review) => (review.documentId === saved.documentId ? saved : review)),
        );
      } else {
        const saved = await createReview(payload, token);
        setReviews((current) => [saved, ...current]);
      }
      setEditingReview(null);
    } catch (error) {
      setReviewError(error.message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open review drawer or redirect to sign-in
  const openReviewDrawer = (review = null) => {
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent("/#reviews")}`);
      return;
    }
    setEditingReview(review);
    setReviewError("");
    setIsDrawerOpen(true);
  };

  // Delete review
  const handleDelete = async (review) => {
    if (!window.confirm("Delete this review? This cannot be undone.")) return;
    setReviewError("");
    try {
      const token = await getToken();
      await deleteReview(review.documentId, token);
      setReviews((current) =>
        current.filter((item) => item.documentId !== review.documentId),
      );
    } catch (error) {
      setReviewError(error.message);
    }
  };

  // Sort reviews based on selected option
  const getSortedReviews = () => {
    const sorted = [...reviews];
    switch (sortBy) {
      case "newest":
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
      case "highest":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return sorted.sort((a, b) => a.rating - b.rating);
      default:
        return sorted;
    }
  };

  // Handle like toggle
  const handleLike = (reviewId) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              liked: !review.liked,
              likes: review.liked
                ? (review.likes || 0) - 1
                : (review.likes || 0) + 1,
            }
          : review,
      ),
    );
  };

  // Generate star display
  const getStarDisplay = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  // Get avatar color based on name - handle undefined names
  const getAvatarColor = (name) => {
    const colors = [
      "bg-resortGreen/10 dark:bg-resortGreen/30 text-resortGreen",
      "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
      "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
      "bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400",
      "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
      "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
    ];
    
    // Return default color if name is invalid
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return colors[0];
    }
    
    const index = name.length % colors.length;
    return colors[index];
  };

  // Filter out reviews without valid names
  const getFilteredReviews = () => {
    const sorted = getSortedReviews();
    return sorted.filter(review => review && review.name);
  };

  // Determine which reviews to display
  const displayedReviews = showAllReviews
    ? getFilteredReviews()
    : getFilteredReviews().slice(0, 3);

  const toggleShowAll = () => {
    setShowAllReviews(!showAllReviews);
  };

  return (
    <>
      <section id="reviews" className="relative bg-white dark:bg-slate-950 py-10 sm:py-14 lg:py-18 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-resortGreen/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-200/10 dark:bg-emerald-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
              <span className="w-6 sm:w-8 h-0.5 bg-resortGreen/50"></span>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-resortGreen">
                Guest Chronicles
              </span>
              <span className="w-6 sm:w-8 h-0.5 bg-resortGreen/50"></span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
              What Our <span className="text-resortGreen">Guests Say</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 sm:mt-3 max-w-md mx-auto px-4">
              Real stories from our guests
            </p>
            {totalReviews > 0 && (
              <div className="flex items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200 dark:border-slate-800/50">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-resortGreen">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="text-yellow-400 text-lg">
                    {getStarDisplay(Math.round(averageRating))}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  Based on {totalReviews}{" "}
                  {totalReviews === 1 ? "review" : "reviews"}
                </span>
              </div>
            )}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center justify-between max-w-6xl mx-auto border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              <i className="fa-regular fa-star text-resortGreen mr-1"></i>
              {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-transparent border-none focus:outline-none text-slate-600 dark:text-slate-300 font-medium cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>
          </div>

          {/* Reviews Grid */}
          {reviewError && (
            <div className="mx-auto max-w-4xl rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-xs text-rose-700 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-300">
              {reviewError}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {displayedReviews.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  No reviews yet. Be the first to share your experience!
                </p>
              </div>
            ) : (
              displayedReviews.map((review) => (
                <div
                  key={review.id}
                  className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-resortGreen/5 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="space-y-4">
                    {/* User Profile Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getAvatarColor(review.name)}`}
                        >
                          {review.name ? review.name.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                            {review.name || "Anonymous Guest"}
                          </h4>
                          <div className="flex items-center gap-1.5">
                            {review.verified && (
                              <span className="inline-flex items-center gap-1 text-[8px] font-bold text-resortGreen">
                                <i className="fa-solid fa-check-circle"></i>
                                Verified
                              </span>
                            )}
                            <span className="text-[8px] text-slate-400">•</span>
                            <p className="text-[8px] text-slate-400 font-medium uppercase tracking-wide">
                              {review.date || "Recent Stay"}
                            </p>
                            {review.roomType && (
                              <>
                                <span className="text-[8px] text-slate-400">
                                  •
                                </span>
                                <p className="text-[8px] text-slate-400 font-medium">
                                  {review.roomType}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex text-amber-400 text-[9px] gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fa-solid fa-star ${i < review.rating ? "text-amber-400" : "text-slate-200 dark:text-slate-700"}`}
                          ></i>
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 font-normal text-xs leading-relaxed font-serif italic">
                      “ {review.comment || "No comment provided"} ”
                    </p>

                    {review.adminReply && (
                      <div className="mt-3 p-3 bg-resortGreen/5 dark:bg-resortGreen/10 rounded-xl border border-resortGreen/10">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[8px] font-bold text-resortGreen uppercase tracking-wider">
                            Management Response
                          </span>
                          <span className="text-[8px] text-slate-400">
                            {review.adminReply.date}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">
                          {review.adminReply.reply}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Heart Toggle */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 mt-4">
                    <button
                      onClick={() => handleLike(review.id)}
                      className="flex items-center gap-1.5 text-[10px] transition-colors cursor-pointer group/like"
                    >
                      {review.liked ? (
                        <i className="fa-solid fa-heart text-rose-500 hover:text-rose-600 transition-all"></i>
                      ) : (
                        <i className="fa-regular fa-heart text-slate-400 group-hover/like:text-rose-400 transition-all"></i>
                      )}
                      <span
                        className={`font-medium ${review.liked ? "text-rose-500" : "text-slate-400"}`}
                      >
                        {review.likes || 0}
                      </span>
                    </button>
                    {review.isOwner && (
                      <div className="ml-auto flex items-center gap-3">
                        <button
                          onClick={() => openReviewDrawer(review)}
                          className="text-[10px] font-semibold text-slate-400 transition-colors hover:text-resortGreen"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(review)}
                          className="text-[10px] font-semibold text-slate-400 transition-colors hover:text-rose-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* View All / Show Less Reviews Link */}
          {totalReviews > 3 && (
            <div className="text-center">
              <button
                onClick={toggleShowAll}
                className="inline-flex items-center gap-2 text-sm font-medium text-resortGreen hover:text-resortGreen-dark transition-colors group"
              >
                <span>
                  {showAllReviews
                    ? "Show Less Reviews"
                    : `View All ${totalReviews} Reviews`}
                </span>
                <i
                  className={`fa-solid fa-chevron-${showAllReviews ? "up" : "down"} text-xs transition-transform duration-300`}
                ></i>
              </button>
            </div>
          )}

          {/* CTA Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all duration-300 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-resortGreen/10 flex items-center justify-center text-resortGreen text-xl">
                <i className="fa-regular fa-pen-to-square"></i>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Share Your Escape
                </h3>
                <p className="text-xs text-slate-400 font-serif italic">
                  “ Leave your mark in our coastal chronicles. ”
                </p>
              </div>
            </div>
            <button
              onClick={() => openReviewDrawer()}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-resortGreen hover:bg-resortGreen-dark text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-resortGreen/30 active:scale-95 cursor-pointer group"
            >
              <span>Write A Review</span>
              <i className="fa-solid fa-arrow-right text-xs transform group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </section>

      <ReviewDrawer
        key={`${isDrawerOpen}-${editingReview?.documentId || "new"}`}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingReview(null);
          setReviewError("");
        }}
        onAddReview={addReview}
        review={editingReview}
        currentUserName={user?.fullName || user?.firstName || "Resort Guest"}
        rooms={rooms}
        isSubmitting={isSubmitting}
        error={reviewError}
      />
    </>
  );
}
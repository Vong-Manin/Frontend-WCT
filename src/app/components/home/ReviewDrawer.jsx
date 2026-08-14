"use client";

import { useState, useEffect } from "react";

export default function ReviewDrawer({
  isOpen,
  onClose,
  onAddReview,
  review = null,
  currentUserName = "",
  rooms = [],
  isSubmitting = false,
  error = "",
}) {
  const [rating, setRating] = useState(review?.rating || 0);
  const [name, setName] = useState(review?.name || currentUserName);
  const [date, setDate] = useState(review?.stayDate?.slice(0, 10) || "");
  const [comment, setComment] = useState(review?.comment || "");
  const [roomType, setRoomType] = useState(review?.roomType || "");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !name || !date || !comment) return;

    const newReview = {
      name,
      stayDate: date,
      rating,
      comment,
      roomType: roomType || "Not specified",
    };

    try {
      await onAddReview(newReview);
      setShowSuccess(true);
    } catch {
      return;
    }

    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      setRating(0);
      setName("");
      setDate("");
      setComment("");
      setRoomType("");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
      ></div>

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-950 border-l border-slate-200/60 dark:border-slate-800 z-50 shadow-2xl transform translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-resortGreen uppercase tracking-widest">
              Share Your Experience
            </h3>
            <p className="text-[10px] text-slate-400 font-serif italic">
              Chronicle your luxury coastal retreat
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer border border-slate-200/30 dark:border-slate-700"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 flex-1 overflow-y-auto space-y-6"
        >
          {/* Rating */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-resortGreen uppercase tracking-wider block">
              Your Evaluation
            </label>
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex text-lg gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className={`transition-all cursor-pointer ${
                      value <= rating
                        ? "text-amber-400 scale-110"
                        : "text-slate-200 dark:text-slate-700 hover:text-amber-400"
                    }`}
                  >
                    <i className="fa-solid fa-star pointer-events-none"></i>
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-bold text-resortGreen uppercase tracking-wider border-l border-slate-200 dark:border-slate-800 pl-4">
                {rating}/5 Stars
              </span>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-resortGreen uppercase tracking-wider block">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              readOnly
              placeholder="Your Full Name"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-resortGreen focus:ring-2 focus:ring-resortGreen/20 transition-all"
              required
            />
          </div>

          {/* Stay Date */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-resortGreen uppercase tracking-wider block">
              Stay Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-resortGreen focus:ring-2 focus:ring-resortGreen/20 transition-all cursor-pointer"
              required
            />
            <p className="text-[8px] text-slate-400">
              Select the month and day of your stay
            </p>
          </div>

          {/* Room Type - Arrow on Left */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-resortGreen uppercase tracking-wider block">
              Room Type (Optional)
            </label>
            <div className="relative">
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-resortGreen focus:ring-2 focus:ring-resortGreen/20 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select a room type</option>
                {rooms.map((room) => (
                  <option key={room.documentId || room.id} value={room.title}>
                    {room.title}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <i className="fa-solid fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-resortGreen uppercase tracking-wider block">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="5"
              placeholder="Share your experience at Khyal Samut Resort..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-resortGreen focus:ring-2 focus:ring-resortGreen/20 transition-all resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-300">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-resortGreen hover:bg-resortGreen-dark disabled:cursor-not-allowed disabled:opacity-60 text-white font-bold py-4 px-4 rounded-xl transition-all cursor-pointer text-[10px] uppercase tracking-widest shadow-lg hover:shadow-2xl hover:shadow-resortGreen/30 transform hover:-translate-y-0.5 active:scale-95"
          >
            {isSubmitting ? "Saving…" : review ? "Update Review" : "Publish Review"}
          </button>
        </form>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 z-[60] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 max-w-sm animate-toast-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <i className="fa-solid fa-circle-check text-lg"></i>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Thank You!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your review has been published.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

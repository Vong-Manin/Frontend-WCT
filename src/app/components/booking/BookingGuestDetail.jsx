// app/components/booking/BookingGuestDetail.jsx
"use client";

export default function BookingGuestDetail({
  formData,
  onFormChange,
  onBack,
  onSubmit,
  isSubmitting,
  error,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
        Guest Details
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
          <i className="fa-solid fa-exclamation-circle mr-2"></i>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            <i className="fa-regular fa-user mr-1 text-resortGreen"></i> Full
            Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onFormChange}
            required
            placeholder="John Doe"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            <i className="fa-regular fa-envelope mr-1 text-resortGreen"></i>{" "}
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onFormChange}
            required
            placeholder="john@example.com"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            <i className="fa-solid fa-phone mr-1 text-resortGreen"></i> Phone
            Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onFormChange}
            required
            placeholder="+1 234 567 890"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            <i className="fa-regular fa-message mr-1 text-resortGreen"></i>{" "}
            Special Requests
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={onFormChange}
            rows="3"
            placeholder="Any special requests for your stay..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition resize-y"
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            <i className="fa-regular fa-credit-card mr-1 text-resortGreen"></i>{" "}
            Payment Method *
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={onFormChange}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-2 focus:ring-resortGreen/60 focus:border-resortGreen transition"
          >
            <option value="credit_card">Credit / Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition font-medium text-sm"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i> Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-resortGreen hover:bg-resortGreen/90 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-resortGreen/30 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Confirm Booking</span>
                <i className="fa-solid fa-lock"></i>
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          <i className="fa-regular fa-lock mr-1"></i>
          Your payment is secure and encrypted
        </p>
      </form>
    </div>
  );
}

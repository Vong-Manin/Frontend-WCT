// app/components/booking/BookingProgress.jsx
"use client";

export default function BookingProgress({ currentStep }) {
  const steps = [
    { number: 1, label: "Start Booking" },
    { number: 2, label: "Guest Details" },
    { number: 3, label: "Confirmation" },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center gap-2 sm:gap-4">
          <div
            className={`flex items-center gap-2 sm:gap-3 ${currentStep >= step.number ? "text-resortGreen" : "text-slate-300 dark:text-slate-600"}`}
          >
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all ${
                currentStep >= step.number
                  ? "bg-resortGreen text-white shadow-lg shadow-resortGreen/30"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
              }`}
            >
              {currentStep > step.number ? (
                <i className="fa-solid fa-check"></i>
              ) : (
                step.number
              )}
            </div>
            <span
              className={`text-xs sm:text-sm font-medium hidden xs:inline ${
                currentStep >= step.number
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`hidden sm:block w-12 h-0.5 ${currentStep > step.number ? "bg-resortGreen" : "bg-slate-200 dark:bg-slate-700"}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}

"use client";

export default function RestaurantTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "menu", label: "Menu", icon: "fa-solid fa-utensils" },
    { id: "gallery", label: "Gallery", icon: "fa-regular fa-images" },
    { id: "reserve", label: "Reserve", icon: "fa-regular fa-calendar-check" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 sm:p-3 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            activeTab === tab.id
              ? "bg-resortGreen text-white shadow-lg shadow-resortGreen/30"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <i className={`${tab.icon} mr-2`}></i>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

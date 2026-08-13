// app/components/Header.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();

  // Theme detection
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      }
    }
  }, []);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    setIsDark(!isDark);
  };

  const navItems = [
    { href: "/", label: "Home", icon: "fa-solid fa-house" },
    { href: "/rooms", label: "Rooms", icon: "fa-solid fa-bed" },
    { href: "/restaurant", label: "Restaurant", icon: "fa-solid fa-utensils" },
    {
      href: "/activities",
      label: "Activities",
      icon: "fa-solid fa-person-walking",
    },
    {
      href: "/about-us",
      label: "About Us",
      icon: "fa-solid fa-umbrella-beach",
    },
  ];

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return "?";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (firstName) {
      return firstName[0].toUpperCase();
    }
    if (user.emailAddresses?.[0]?.emailAddress) {
      return user.emailAddresses[0].emailAddress[0].toUpperCase();
    }
    return "U";
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg"
            : "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md"
        } border-b border-slate-100 dark:border-slate-800`}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
            {/* Logo - Always Visible */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link href="/" className="block focus:outline-none">
                <Image
                  src="/image/logo.png"
                  alt="Khyal Samut Resort Logo"
                  width={36}
                  height={36}
                  className="rounded-full object-cover ring-2 sm:ring-4 ring-resortGreen/10"
                  style={{ width: "36px", height: "36px" }}
                  priority
                />
              </Link>
              <span className="hidden sm:inline-block text-sm sm:text-base font-bold text-slate-800 dark:text-white tracking-tight">
                Khyal Samut
              </span>
              <span className="sm:hidden text-xs font-bold text-slate-800 dark:text-white tracking-tight">
                KS
              </span>
            </div>

            {/* Desktop Navigation - Hidden on Mobile */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-8 font-semibold text-slate-600 dark:text-slate-300 text-sm lg:text-base">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b-2 pb-1 transition-all ${
                    pathname === item.href
                      ? "text-resortGreen border-resortGreen"
                      : "border-transparent hover:text-resortGreen hover:border-resortGreen"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Icons - Responsive */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
              {/* Mobile Menu Toggle - Only on Mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-resortGreen rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                aria-label="Toggle Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <i className="fa-solid fa-xmark text-lg sm:text-xl"></i>
                ) : (
                  <i className="fa-solid fa-bars text-lg sm:text-xl"></i>
                )}
              </button>

              {/* Notification Bell */}
              <button className="hidden xs:flex relative p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:text-resortGreen rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
                <span className="absolute top-1 right-1 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
                <i className="fa-regular fa-bell text-sm sm:text-base lg:text-xl"></i>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:text-resortGreen rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                aria-label="Toggle theme"
              >
                <i
                  className={`fa-regular ${isDark ? "fa-sun" : "fa-moon"} text-sm sm:text-base lg:text-xl inline-block transition-all duration-500`}
                ></i>
              </button>

              {/* Account Section - Clerk Integration */}
              {isLoaded ? (
                <>
                  {!isSignedIn ? (
                    <Link
                      href="/sign-in"
                      className="flex items-center gap-0.5 sm:gap-1 p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:text-resortGreen rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer group"
                      aria-label="Sign in"
                    >
                      <i className="fa-regular fa-user text-sm sm:text-base lg:text-xl"></i>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2">
                      {/* User Button with Clerk */}
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "w-8 h-8 sm:w-9 sm:h-9",
                            userButtonPopoverCard: "shadow-xl",
                          },
                        }}
                      />
                    </div>
                  )}
                </>
              ) : (
                // Loading state
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown Menu - Only Pages with Icons */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-14 sm:top-16 z-40 md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl overflow-y-auto animate-slide-down">
          <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
            <div className="w-full max-w-xs space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                    pathname === item.href
                      ? "text-resortGreen bg-resortGreen/10 font-bold"
                      : "text-slate-700 dark:text-slate-300 hover:text-resortGreen hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <span className="w-8 h-8 flex items-center justify-center text-lg">
                    <i className={`${item.icon} text-resortGreen`}></i>
                  </span>
                  <span className="text-base font-medium">{item.label}</span>
                  {pathname === item.href && (
                    <span className="ml-auto text-resortGreen">
                      <i className="fa-solid fa-check-circle"></i>
                    </span>
                  )}
                </Link>
              ))}

              {/* Mobile Auth Links */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-2">
                {isLoaded && (
                  <>
                    {!isSignedIn ? (
                      <>
                        <Link
                          href="/sign-in"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-4 px-4 py-4 rounded-xl text-slate-700 dark:text-slate-300 hover:text-resortGreen hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all"
                        >
                          <span className="w-8 h-8 flex items-center justify-center text-lg">
                            <i className="fa-regular fa-user text-resortGreen"></i>
                          </span>
                          <span className="text-base font-medium">Sign In</span>
                        </Link>
                        <Link
                          href="/sign-up"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-4 px-4 py-4 rounded-xl bg-resortGreen/10 text-resortGreen hover:bg-resortGreen/20 transition-all"
                        >
                          <span className="w-8 h-8 flex items-center justify-center text-lg">
                            <i className="fa-solid fa-user-plus text-resortGreen"></i>
                          </span>
                          <span className="text-base font-medium">Sign Up</span>
                        </Link>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          signOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-4 px-4 py-4 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all w-full"
                      >
                        <span className="w-8 h-8 flex items-center justify-center text-lg">
                          <i className="fa-solid fa-right-from-bracket text-red-500"></i>
                        </span>
                        <span className="text-base font-medium">Sign Out</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

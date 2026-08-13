import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 text-sm">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 border-b border-white/5 pb-8 sm:pb-12 lg:pb-16 mb-6 sm:mb-8">
          {/* Logo & Description - Responsive */}
          <div className="space-y-4 sm:space-y-6 text-center md:text-left">
            <Image
              src="/image/logo.png"
              alt="Khyal Samut Resort Logo footer"
              width={56}
              height={56}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover mx-auto md:mx-0 shadow-xl"
            />
            <p className="leading-relaxed text-slate-400 font-light text-xs sm:text-sm max-w-xs mx-auto md:mx-0">
              Khyal Samut Resort is your pristine seaside paradise for
              refreshing downtime experiences and permanent family holiday
              memories.
            </p>
          </div>

          {/* Quick Links - Responsive */}
          <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            <h4 className="text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs">
              Quick Links
            </h4>
            <div className="flex flex-row sm:flex-col flex-wrap justify-center md:justify-start gap-2 sm:gap-2.5 font-medium">
              <Link
                href="/"
                className="hover:text-white transition-colors text-xs sm:text-sm"
              >
                Home
              </Link>
              <Link
                href="/rooms"
                className="hover:text-white transition-colors text-xs sm:text-sm"
              >
                Rooms
              </Link>
              <Link
                href="/restaurant"
                className="hover:text-white transition-colors text-xs sm:text-sm"
              >
                Restaurant
              </Link>
              <Link
                href="/activities"
                className="hover:text-white transition-colors text-xs sm:text-sm"
              >
                Activities
              </Link>
              <Link
                href="/about-us"
                className="hover:text-white transition-colors text-xs sm:text-sm"
              >
                About Us
              </Link>
            </div>
          </div>

          {/* Contact Info - Responsive */}
          <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            <h4 className="text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs">
              Contact Us
            </h4>
            <div className="space-y-3 sm:space-y-4 text-slate-400">
              {/* Address */}
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <i className="fa-solid fa-location-dot mt-1 text-resortGreen shrink-0 text-sm sm:text-base"></i>
                <span className="leading-relaxed font-light text-xs sm:text-sm">
                  Crab Market Road, Prey Thom <br />
                  <span className="text-slate-500 text-[10px] sm:text-xs">
                    Kep City, Kep Province 23000
                  </span>
                </span>
              </div>
              {/* Phone */}
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <i className="fa-solid fa-phone text-resortGreen shrink-0 text-sm sm:text-base"></i>
                <a
                  href="tel:+963550378"
                  className="hover:text-white transition-colors font-light text-xs sm:text-sm"
                >
                  +963550378
                </a>
              </div>
              {/* Email */}
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <i className="fa-solid fa-envelope text-resortGreen shrink-0 text-sm sm:text-base"></i>
                <a
                  href="mailto:maninvong6@gmail.com"
                  className="hover:text-white transition-colors font-light text-xs sm:text-sm break-all"
                >
                  maninvong6@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Responsive */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-xs text-slate-600 gap-3 sm:gap-4">
          <p>&copy; 2026 Khyal Samut Resort. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="#" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

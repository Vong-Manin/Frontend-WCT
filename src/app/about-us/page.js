// app/about/page.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section - Minimal */}
      <section className="relative bg-white dark:bg-slate-950 pt-20 sm:pt-28 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-medium text-resortGreen uppercase tracking-widest">
              About Khyal Samut Resort
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-900 dark:text-white mt-3 leading-tight">
              Where luxury meets
              <br />
              <span className="font-serif text-resortGreen">authenticity</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mt-4 max-w-xl font-light leading-relaxed">
              Established in 2018, Khyal Samut Resort has become a sanctuary for
              travelers seeking refined comfort and genuine Cambodian
              hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-10 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <p className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                2018
              </p>
              <p className="text-sm text-slate-400">Year Established</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                150+
              </p>
              <p className="text-sm text-slate-400">Luxury Rooms</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                4.9
              </p>
              <p className="text-sm text-slate-400">Guest Rating</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
                2K+
              </p>
              <p className="text-sm text-slate-400">Happy Guests</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white dark:bg-slate-950 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-medium text-resortGreen uppercase tracking-widest">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white mt-3 mb-6">
                More than just a
                <br />
                <span className="font-serif text-resortGreen">
                  place to stay
                </span>
              </h2>
              <div className="space-y-4 text-slate-500 dark:text-slate-400 leading-relaxed">
                <p>
                  Khyal Samut Resort was born from a vision to create a
                  sanctuary where guests could escape the ordinary and embrace
                  the extraordinary. Nestled along Cambodia's pristine
                  coastline, we offer a harmonious blend of luxury, nature, and
                  authentic Khmer hospitality.
                </p>
                <p>
                  Every element of our resort is thoughtfully designed to
                  provide an unforgettable experience. From our eco-friendly
                  architecture to our locally-sourced cuisine, we are committed
                  to sustainability while delivering world-class luxury.
                </p>
                <p>
                  Today, we continue to evolve, always striving to exceed
                  expectations and create memories that last a lifetime.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/rooms"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-resortGreen hover:bg-resortGreen-dark text-white text-sm font-medium rounded-lg transition-all"
                >
                  <span>Explore Rooms</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 border border-slate-200 dark:border-slate-700 hover:border-resortGreen text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-all"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>

            <div>
              <div className="relative rounded-2xl overflow-hidden">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=600&fit=crop"
                      alt="Resort pool"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden mt-6">
                    <Image
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=600&fit=crop"
                      alt="Resort room"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden -mt-6">
                    <Image
                      src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=600&fit=crop"
                      alt="Beach view"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=600&fit=crop"
                      alt="Dining"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-medium text-resortGreen uppercase tracking-widest">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white mt-3">
              What guides{" "}
              <span className="font-serif text-resortGreen">everything</span> we
              do
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-resortGreen/10 rounded-xl flex items-center justify-center mb-5">
                <i className="fa-solid fa-leaf text-xl text-resortGreen"></i>
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                Sustainability
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Committed to protecting our environment through eco-friendly
                practices and supporting local communities.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-5">
                <i className="fa-solid fa-hand-heart text-xl text-amber-500"></i>
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                Authentic Hospitality
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Genuine Khmer warmth that makes every guest feel like family
                from the moment they arrive.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-5">
                <i className="fa-solid fa-star text-xl text-purple-500"></i>
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                Excellence
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Perfection in every detail, from luxurious accommodations to
                world-class dining and activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Contact Section */}
      <section className="bg-white dark:bg-slate-950 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Trust */}
            <div>
              <span className="text-xs font-medium text-resortGreen uppercase tracking-widest">
                Trust & Security
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white mt-3 mb-6">
                Book with{" "}
                <span className="font-serif text-resortGreen">confidence</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <i className="fa-solid fa-shield-halved text-resortGreen text-lg mt-0.5"></i>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">
                      Secure Booking
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      SSL encrypted transactions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <i className="fa-solid fa-star text-amber-500 text-lg mt-0.5"></i>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">
                      Verified Reviews
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      4.9/5 from 2,000+ guests
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <i className="fa-solid fa-headset text-resortGreen text-lg mt-0.5"></i>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">
                      24/7 Support
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Dedicated team available round the clock
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <i className="fa-solid fa-rotate-left text-resortGreen text-lg mt-0.5"></i>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">
                      Flexible Cancellation
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Free cancellation up to 48 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer */}
            <div>
              <span className="text-xs font-medium text-resortGreen uppercase tracking-widest">
                Developer
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white mt-3 mb-6">
                Crafted with{" "}
                <span className="font-serif text-resortGreen">passion</span>
              </h2>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-resortGreen/30 flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop"
                      alt="Developer"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white">
                      John Doe
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Full Stack Developer
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Built with Next.js, Tailwind CSS, and Strapi CMS.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://github.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-xs font-medium transition-all"
                  >
                    <i className="fa-brands fa-github"></i> GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-xs font-medium transition-all"
                  >
                    <i className="fa-brands fa-linkedin-in"></i> LinkedIn
                  </a>
                  <a
                    href="mailto:your.email@gmail.com"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-xs font-medium transition-all"
                  >
                    <i className="fa-regular fa-envelope"></i> Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-resortGreen/5 dark:bg-resortGreen/10 py-16 sm:py-20 border-t border-resortGreen/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
            Ready to experience <br />
            <span className="font-serif text-resortGreen">
              Khyal Samut Resort?
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-md mx-auto">
            Book your stay and discover why guests return again and again.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-resortGreen hover:bg-resortGreen-dark text-white text-sm font-medium rounded-lg transition-all shadow-lg hover:shadow-resortGreen/30"
            >
              <span>Explore Rooms</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section - Bold & Impactful */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-24 sm:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, #127541 0%, transparent 50%)`,
            }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 80% 50%, #127541 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-resortGreen rounded-full animate-pulse"></span>
              <span className="text-xs font-medium text-white/80 tracking-wider">
                ABOUT THIS PROJECT
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Building Digital
              <br />
              <span className="bg-gradient-to-r from-resortGreen to-emerald-300 bg-clip-text text-transparent">
                Experiences
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
              The story behind Khyal Samut Resort's digital presence — crafted
              with purpose, passion, and precision.
            </p>
          </div>
        </div>
      </section>

      {/* Purpose Section - Modern Cards */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-medium text-resortGreen uppercase tracking-[0.3em] mb-4">
              Purpose
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
              Why This Website <br />
              <span className="text-resortGreen">Exists</span>
            </h2>
            <div className="w-20 h-1 bg-resortGreen mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 dark:border-slate-800">
              <div className="w-16 h-16 bg-resortGreen/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-resortGreen/20 transition-colors">
                <i className="fa-solid fa-rocket text-2xl text-resortGreen"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Showcase Excellence
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                To present Khyal Samut Resort as a world-class destination
                through an elegant, immersive digital experience that reflects
                the luxury and authenticity of the brand.
              </p>
            </div>

            <div className="group bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 dark:border-slate-800">
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                <i className="fa-solid fa-handshake text-2xl text-amber-500"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Build Trust
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                To establish credibility and trust with potential guests through
                transparent information, authentic storytelling, and a
                professional online presence.
              </p>
            </div>

            <div className="group bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 dark:border-slate-800">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <i className="fa-solid fa-wand-magic-sparkles text-2xl text-purple-500"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Deliver Experience
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                To provide a seamless, intuitive booking experience that mirrors
                the exceptional service guests can expect during their stay at
                the resort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section - Split Layout */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block text-xs font-medium text-resortGreen uppercase tracking-[0.3em] mb-4">
                Developer
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Crafted with
                <br />
                <span className="text-resortGreen">Code &amp; Passion</span>
              </h2>
              <div className="space-y-4 text-slate-500 dark:text-slate-400 leading-relaxed">
                <p>
                  This website is the result of a vision to create something
                  truly special — a digital space that captures the essence of
                  Khyal Samut Resort while providing a seamless user experience.
                </p>
                <p>
                  Built with modern technologies and a focus on performance,
                  accessibility, and beautiful design, every line of code is
                  written with the user in mind.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-resortGreen/10 text-resortGreen text-sm font-medium rounded-lg">
                  <i className="fa-solid fa-code"></i> Next.js
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-resortGreen/10 text-resortGreen text-sm font-medium rounded-lg">
                  <i className="fa-brands fa-tailwind"></i> Tailwind CSS
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-resortGreen/10 text-resortGreen text-sm font-medium rounded-lg">
                  <i className="fa-solid fa-database"></i> Strapi CMS
                </span>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-resortGreen/30 flex-shrink-0">
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReAPi4zoSym05vA7kqZqC3nmhep72jL3xqsvQ1y5tm9Q&s=10"
                      alt="Developer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Vong Manin
                    </h3>
                    <p className="text-resortGreen font-medium">
                      Full Stack Developer
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  Passionate about creating beautiful, performant web
                  experiences that make a difference. Dedicated to delivering
                  quality through clean code and thoughtful design.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/Vong-Manin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition-all"
                  >
                    <i className="fa-brands fa-github"></i> GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/Vong Manin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0A66C2] hover:bg-[#0A66C2]/80 text-white text-sm font-medium rounded-xl transition-all"
                  >
                    <i className="fa-brands fa-linkedin-in"></i> LinkedIn
                  </a>
                  <a
                    href="mailto:maninvong6@gmail.com"
                    className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-resortGreen hover:bg-resortGreen-dark text-white text-sm font-medium rounded-xl transition-all"
                  >
                    <i className="fa-regular fa-envelope"></i> Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section - Visual */}
      <section className="py-16 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-[0.3em]">
              Powered By
            </h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            <div className="flex items-center gap-3">
              <i className="fa-brands fa-react text-3xl text-sky-500"></i>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Next.js
              </span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fa-brands fa-tailwind text-3xl text-sky-400"></i>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Tailwind CSS
              </span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-database text-3xl text-emerald-500"></i>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Strapi CMS
              </span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fa-brands fa-figma text-3xl text-purple-500"></i>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Figma
              </span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fa-brands fa-github text-3xl text-slate-700 dark:text-slate-400"></i>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                GitHub
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-resortGreen/5 via-white to-amber-50/20 dark:from-resortGreen/10 dark:via-slate-950 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-medium text-resortGreen uppercase tracking-[0.3em] mb-4">
              Impact
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
              Making a <span className="text-resortGreen">Difference</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-resortGreen mb-2">
                100%
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Responsive Design
              </p>
              <p className="text-xs text-slate-400">Works on every device</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-resortGreen mb-2">
                4.9★
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                User Satisfaction
              </p>
              <p className="text-xs text-slate-400">From real guest feedback</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-resortGreen mb-2">
                2K+
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Happy Users
              </p>
              <p className="text-xs text-slate-400">And counting</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Experience the Resort?
          </h3>
          <p className="text-white/60 mb-8">
            Book your stay and discover the magic of Khyal Samut Resort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-resortGreen hover:bg-resortGreen-dark text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-resortGreen/30"
            >
              <span>Explore Rooms</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

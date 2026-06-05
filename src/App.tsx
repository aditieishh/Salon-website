/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServicesList from "./components/ServicesList";
import GallerySection from "./components/GallerySection";
import AboutSection from "./components/AboutSection";
import ReviewsSection from "./components/ReviewsSection";
import BookingForm from "./components/BookingForm";
import { SALON_DETAILS, SALON_SERVICES, PORTFOLIO_ITEMS } from "./data";
import { ServiceCategory } from "./types";
import { Calendar, Phone, MapPin, Sparkles, Star, ChevronRight, Eye, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [preselectedServiceId, setPreselectedServiceId] = useState<string>("");

  const handleBookClick = () => {
    setActiveTab("book");
  };

  const handleSelectService = (service: any) => {
    setPreselectedServiceId(service.id);
    setActiveTab("book");
  };

  const handleBookLook = (categoryName: string, lookTitle: string) => {
    // Try to find a matching service for this category or use custom notes
    const matched = SALON_SERVICES.find(
      (s) => s.category === categoryName || s.name.toLowerCase().includes(lookTitle.toLowerCase())
    );
    if (matched) {
      setPreselectedServiceId(matched.id);
    }
    setActiveTab("book");
  };

  // Previews on Home Page
  const popularServices = SALON_SERVICES.filter((s) => s.popular).slice(0, 3);
  const homeGalleryItems = PORTFOLIO_ITEMS.slice(0, 4);

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black flex flex-col justify-between">
      
      {/* 1. STICKY BRANDED HEADER */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBookClick={handleBookClick}
      />

      {/* 2. DYNAMIC CONTENT RENDERING CHANNELS */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-20 pb-20"
            >
              {/* Cinematic Video Hero Block */}
              <Hero
                onBookClick={handleBookClick}
                onServicesClick={() => setActiveTab("services")}
              />

              {/* Home Services Focus */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
                      AESTHETIC SIGNATURE TREATMENTS
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-light uppercase mt-1 tracking-widest">
                      Popular <span className="italic font-serif text-[#D4AF37] capitalize">Collections</span>
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("services")}
                    className="group text-[10px] text-[#D4AF37] hover:text-white uppercase tracking-widest font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    View entire catalogue
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {popularServices.map((ser) => (
                    <div
                      key={ser.id}
                      className="bg-[#080808] border border-white/10 rounded-none overflow-hidden group hover:border-[#D4AF37]/35 transition-all duration-300 flex flex-col h-full"
                    >
                      <div className="h-52 overflow-hidden relative">
                        <img
                          src={ser.image}
                          alt={ser.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-4 left-4 bg-black/90 px-2.5 py-1 rounded-none border border-white/5 text-[9px] font-mono uppercase tracking-widest text-[#D4AF37]">
                          {ser.category}
                        </span>
                      </div>
                      <div className="p-6 space-y-4 flex flex-col flex-1 justify-between">
                        <div className="space-y-2">
                          <h4 className="text-base uppercase tracking-wider font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                            {ser.name}
                          </h4>
                          <p className="text-zinc-500 text-xs leading-relaxed font-light line-clamp-3">
                            {ser.description}
                          </p>
                        </div>
                        <div className="space-y-4 pt-4 border-t border-white/5">
                          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                            <span className="text-zinc-500">Duration: {ser.duration}</span>
                            <span className="text-[#D4AF37] font-bold">{ser.price}</span>
                          </div>
                          <button
                            onClick={() => handleSelectService(ser)}
                            className="w-full py-3 bg-transparent hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/50 hover:border-[#D4AF37] rounded-none text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer"
                          >
                            Select & Reserve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Home Portfolio Preview */}
              <section className="bg-[#080808] py-20 border-y border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
                        CRAFT WORK SNAPSHOT
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-light uppercase mt-1 tracking-widest">
                        Our Gallery <span className="italic font-serif text-[#D4AF37] capitalize">Highlights</span>
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("gallery")}
                      className="group text-[10px] text-[#D4AF37] hover:text-white uppercase tracking-widest font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      Browse full portfolio
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {homeGalleryItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setActiveTab("gallery")}
                        className="relative h-64 bg-zinc-90 w-full overflow-hidden rounded-none border border-white/10 hover:border-[#D4AF37]/30 group cursor-pointer shadow-xl transition-all duration-300"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-5">
                          <span className="text-[9px] font-mono uppercase bg-black/90 text-[#D4AF37] px-2 py-0.5 rounded-none border border-white/15 max-w-max tracking-wider">
                            {item.category}
                          </span>
                          <h4 className="text-xs uppercase tracking-wider font-semibold text-white mt-1.5 leading-snug">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Trust Section */}
              <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
                <div className="inline-flex bg-black border border-white/10 rounded-none p-1.5 pr-4 items-center gap-2">
                  <span className="bg-[#D4AF37] text-black font-bold px-2.5 py-1 rounded-none text-[9px] font-mono tracking-widest">
                    5.0 STAR
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase">Rated on Google with 310+ reviews!</span>
                </div>
                <h3 className="text-2xl sm:text-3.5xl font-light uppercase text-white tracking-widest">
                  Why Chaitra Beauty Zone Is Your <span className="italic font-serif text-[#D4AF37] capitalize">Premier Choice</span>
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed max-w-3xl mx-auto tracking-wide">
                  We maintain surgical standards of instrument sterilization, use only certified dermatologist-tested cosmetics, and hand-grind pure mehendi herbs for long-lasting vibrant stains. Countless brides in Vizianagaram trust us for their life's grandest moments.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleBookClick}
                    className="px-10 py-4 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold text-[11px] uppercase tracking-widest hover:scale-[1.01] transition-all cursor-pointer rounded-none"
                  >
                    Experience It Yourself
                  </button>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ServicesList onServiceSelect={handleSelectService} />
            </motion.div>
          )}

          {activeTab === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <GallerySection onBookLook={handleBookLook} />
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AboutSection />
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ReviewsSection />
            </motion.div>
          )}

          {activeTab === "book" && (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <BookingForm
                preselectedServiceId={preselectedServiceId}
                clearPreselectedService={() => setPreselectedServiceId("")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. SOLID FOOTER ELEMENT */}
      <footer id="salon-footer" className="bg-[#030303] border-t border-white/10 py-16 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-[#D4AF37] text-zinc-950">
                <Layers className="w-4 h-4" />
              </span>
              <h2 className="text-white font-extrabold text-sm tracking-wider uppercase">
                CHAITRA <span className="text-[#D4AF37] font-light">Beauty Zone</span>
              </h2>
            </div>
            <p className="text-zinc-500 text-[11px] leading-relaxed font-light">
              Providing unrivaled beauty treatments, tailored bridal mehendi designs, Maggam stitch works, and styling comfort since inception in Vizianagaram.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-[#D4AF37] font-mono uppercase text-[9.5px] tracking-[0.2em] font-bold">
              Quick links
            </h5>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <button onClick={() => setActiveTab("home")} className="text-left hover:text-[#D4AF37] transition-colors cursor-pointer">Home</button>
              <button onClick={() => setActiveTab("services")} className="text-left hover:text-[#D4AF37] transition-colors cursor-pointer">Treatments</button>
              <button onClick={() => setActiveTab("gallery")} className="text-left hover:text-[#D4AF37] transition-colors cursor-pointer">Portfolios</button>
              <button onClick={() => setActiveTab("reviews")} className="text-left hover:text-[#D4AF37] transition-colors cursor-pointer">Reviews</button>
              <button onClick={() => setActiveTab("about")} className="text-left hover:text-[#D4AF37] transition-colors cursor-pointer">Our Mall</button>
              <button onClick={handleBookClick} className="text-left hover:text-white transition-colors text-[#D4AF37] cursor-pointer">Book Seat</button>
            </div>
          </div>

          {/* Services Quicklist */}
          <div className="space-y-3">
            <h5 className="text-[#D4AF37] font-mono uppercase text-[9.5px] tracking-[0.2em] font-bold">
              Offerings
            </h5>
            <div className="grid grid-cols-1 gap-1.5 text-[11px] text-zinc-450 uppercase font-mono tracking-wider text-zinc-400">
              <span>Bridal Henna & Mehendi</span>
              <span>Maggam Embroidery Blouses</span>
              <span>Keratin Hair Straightening</span>
              <span>HD Celebrity Makeover</span>
              <span>Painless Stitchless Earlobe repairing</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h5 className="text-[#D4AF37] font-mono uppercase text-[9.5px] tracking-[0.2em] font-bold">
              Direct Contact
            </h5>
            <p className="text-zinc-500 text-[11px] font-light leading-relaxed">
              1st Floor, SVB MALL, RTC Complex Area, Balaji Nagar, Vizianagaram, AP 535003
            </p>
            <p className="text-white font-bold font-mono text-xs tracking-wider">
              📞 {SALON_DETAILS.phone}
            </p>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-[10px] text-zinc-650 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Chaitra Beauty Zone. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href={SALON_DETAILS.socials.justdial} target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors">
              JUSTDIAL_LISTING
            </a>
            <span>•</span>
            <span className="text-emerald-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              FIRESTORE_SECURED
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}


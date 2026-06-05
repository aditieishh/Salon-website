/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Scissors, Calendar, MapPin, Phone, Menu, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SALON_DETAILS } from "../data";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBookClick: () => void;
}

export default function Header({ activeTab, setActiveTab, onBookClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "about", label: "About" },
    { id: "reviews", label: "Reviews" },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header id="salon-header" className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
      {/* Top micro bar detailing quick info */}
      <div className="hidden sm:flex bg-[#0a0a0a] text-zinc-400 py-2 border-b border-white/10 px-4 text-xs justify-between items-center">
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1.5 font-sans">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            1st Floor, SVB MALL, RTC Complex Area, Vizianagaram
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Open Daily: {SALON_DETAILS.hours}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 outline-none text-[#D4AF37] font-medium font-mono text-[11px] tracking-wide">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] stroke-none" />
            5.0 rating (310+ Google Reviews)
          </span>
          <span className="text-zinc-800">|</span>
          <a
            href={`tel:${SALON_DETAILS.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-1 text-zinc-300 hover:text-[#D4AF37] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#D4AF37]" />
            Call: {SALON_DETAILS.phone}
          </a>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex items-baseline space-x-2 cursor-pointer" onClick={() => handleNavClick("home")}>
            <span className="text-2xl font-light tracking-[0.2em] uppercase text-[#D4AF37]">Chaitra</span>
            <span className="text-xs tracking-widest uppercase opacity-60 text-white font-mono">Beauty Zone</span>
          </div>
        </div>

        {/* Desktop Tabs menu */}
        <nav className="hidden md:flex space-x-8 text-[11px] tracking-[0.15em] uppercase font-medium">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`hover:text-[#D4AF37] transition-colors tracking-[0.16em] uppercase text-[11px] font-semibold relative ${
                  isActive ? "text-[#D4AF37]" : "text-white opacity-75 hover:opacity-100"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-[#D4AF37]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Dynamic Booking CTA key button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="header-cta-book"
            onClick={onBookClick}
            className={`px-6 py-2 border text-[10px] uppercase tracking-widest transition-all duration-300 font-semibold cursor-pointer ${
              activeTab === "book"
                ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                : "border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
            }`}
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick inline status badge for space constraint on mob */}
          <div className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Open
          </div>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white transition-colors bg-zinc-950 rounded-lg border border-zinc-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 animate-pulse" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Dynamic mobile overlay slider */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/10 bg-[#080808] p-4 space-y-2 absolute left-0 right-0 shadow-2xl z-50"
          >
            <div className="grid grid-cols-2 gap-2 pb-4">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`p-3 rounded-xl text-xs uppercase tracking-widest transition-all text-center block font-semibold ${
                      isActive
                        ? "bg-[#D4AF37] text-black shadow-lg shadow-black/40"
                        : "bg-zinc-900/60 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => {
                onBookClick();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#D4AF37] text-black py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment Now
            </button>
            <div className="pt-2 text-center text-[10px] text-zinc-500 font-mono">
              📞 Emergency Support: {SALON_DETAILS.phone}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

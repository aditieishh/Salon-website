/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Calendar, Phone, Sparkles, MapPin, MessageSquare, Star } from "lucide-react";
import { motion } from "motion/react";
import { SALON_DETAILS } from "../data";

interface HeroProps {
  onBookClick: () => void;
  onServicesClick: () => void;
}

export default function Hero({ onBookClick, onServicesClick }: HeroProps) {
  // A premium public stock loop of a haircut/styling salon
  const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-hairdresser-brushing-and-blow-drying-long-hair-40167-large.mp4";

  return (
    <section id="hero-section" className="relative h-[80vh] sm:h-[82vh] lg:h-[88vh] min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] w-full bg-[#050505] overflow-hidden flex items-center justify-center">
      {/* 1. Video Background Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Seamless visual fallback if video is slow, in low-power state, or offline */}
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1920"
          alt="Luxury Hair Salon Background Overlay"
          className="absolute inset-0 w-full h-full object-cover opacity-20 scale-105"
          referrerPolicy="no-referrer"
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Deep vignetting/gradient overlay for luxurious readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/65 to-[#050505]/95 z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/95 z-1" />
      </div>

      {/* 2. Visual camera focus bracket markers to enhance tech-inspired luxury */}
      <div className="hidden lg:block absolute inset-12 border border-white/[0.03] pointer-events-none z-2">
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]/25" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#D4AF37]/25" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#D4AF37]/25" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]/25" />
        <div className="absolute top-1/2 left-4 text-[9px] font-mono tracking-widest text-[#D4AF37]/30 -rotate-90">CHAITRA_STUDIO_VZN</div>
        <div className="absolute top-1/2 right-4 text-[9px] font-mono tracking-widest text-[#D4AF37]/30 rotate-90">LENS_REF_GOLD_MODE</div>
      </div>

      {/* 3. Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Rating tag */}
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/5 border border-l-2 border-white/10 border-l-[#D4AF37] px-3.5 py-1.5 rounded-none backdrop-blur-sm shadow-md">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span className="text-[9px] tracking-widest text-zinc-300 uppercase font-mono flex items-center gap-1.5 font-semibold">
              PREMIER SALON & MEHENDI ZONE IN VIZIANAGARAM
              <span className="flex items-center text-[#D4AF37] gap-0.5 ml-1 border-l border-white/10 pl-1.5">
                <Star className="w-2.5 h-2.5 fill-[#D4AF37] stroke-none" />
                5.0
              </span>
            </span>
          </div>

          {/* Majestic Hero Headline and Title */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7.5xl lg:text-8xl font-light tracking-tight leading-[0.98] uppercase">
              Elegance <br />
              <span className="italic font-serif text-[#D4AF37] capitalize font-normal">redefined.</span>
            </h1>
          </div>

          {/* Description & Location */}
          <p className="max-w-md mx-auto text-zinc-400 text-xs sm:text-sm tracking-widest uppercase font-light leading-relaxed px-4">
            Vizianagaram's premier destination for bespoke bridal mehendi, high-end celebrity makeovers, and specialist hair styling solutions.
          </p>

          {/* Quick Location Badge */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[9px] text-zinc-500 font-mono uppercase tracking-widest px-4">
            <span className="flex items-center gap-1.5 bg-[#080808]/90 border border-white/10 px-3 py-1.5 rounded-none">
              <MapPin className="w-3 h-3 text-[#D4AF37]" />
              1st Floor, SVB MALL, RTC Complex Area
            </span>
            <span className="text-zinc-800 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 bg-[#080808]/90 border border-white/10 px-3 py-1.5 rounded-none">
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              Support: {SALON_DETAILS.phone}
            </span>
          </div>

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2 max-w-sm sm:max-w-md mx-auto px-4">
            {/* Book Button */}
            <button
              id="hero-book-now"
              onClick={onBookClick}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] text-black text-[11px] font-bold uppercase tracking-widest hover:bg-[#D4AF37]/90 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer rounded-none"
            >
              Book Appointment
            </button>

            {/* Services/WhatsApp option */}
            <a
              href={`https://wa.me/${SALON_DETAILS.whatsappPhone.replace("+", "")}?text=Hi%20Chaitra%20Beauty%2520Zone,%20I'd%20like%20to%20inquire%20about%20your%20services!`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 border border-[#25D366]/30 text-[#25D366] text-[11px] font-bold uppercase tracking-widest hover:bg-[#25D366]/5 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 cursor-pointer rounded-none"
            >
              <MessageSquare className="w-4 h-4 fill-emerald-500/10" />
              WhatsApp Inquiry
            </a>
          </div>
        </motion.div>
      </div>

      {/* 4. Elegant bottom fade curve */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-3" />
    </section>
  );
}

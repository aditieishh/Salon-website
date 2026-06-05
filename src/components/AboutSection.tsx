/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Clock, MapPin, Compass, ShieldCheck, Heart, Award, Phone } from "lucide-react";
import { SALON_DETAILS } from "../data";

export default function AboutSection() {
  return (
    <div id="about-pane" className="py-12 sm:py-20 bg-[#050505] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 font-sans">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            THE CHAITRA STORY & PREMISES
          </span>
          <h2 className="text-3xl sm:text-5xl font-light uppercase mt-3 tracking-widest">
            About Our <span className="italic font-serif text-[#D4AF37] capitalize">Beauty Zone</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4 opacity-50" />
          <p className="text-zinc-500 text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
            Providing top-rated bridal care, bespoke design styling, and therapeutic wellness secrets under a single luxurious roof in Vizianagaram.
          </p>
        </div>

        {/* Narrative Section - Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 font-sans">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-wider leading-snug">
              Where Elegant Tradition Meets <span className="italic font-serif text-[#D4AF37] capitalize">Modern Craft</span>
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-light">
              At Chaitra Beauty Zone, we believe that beauty care is a specialized form of styling expression. 
              Founded as a boutique beauty parlour and customized tailoring center in Andhra Pradesh, we have grown to become the highest-rated salon hub in Vizianagaram (5.0 rating across 310+ genuine local reviews).
            </p>
            <p className="text-zinc-500 text-xs leading-relaxed font-light">
              Under our roof, master artisans blend classic Indian wedding traditions—like intricate, long-staining organic herbal mehendi and heavily detailed Maggam embroidery stitching—with advanced cosmopolitan hair cuts, keratin spas, and clinical-grade painless earlobe repair.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3 bg-[#080808] p-4 rounded-none border border-white/10">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-white">Pure Organic Practice</h4>
                  <p className="text-zinc-500 text-[10px] font-light mt-1">Chemical-free henna pastes and medical grade cosmetic tools.</p>
                </div>
              </div>
              <div className="flex gap-3 bg-[#080808] p-4 rounded-none border border-white/10">
                <Award className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-white">Certified Specialists</h4>
                  <p className="text-zinc-500 text-[10px] font-light mt-1">Stitching masters and aesthetic skin professionals.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image/Banner Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-none overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800"
                alt="Inside Chaitra Beauty Zone"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover transition-transform duration-700"
              />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-black/90 backdrop-blur-md p-6 rounded-none border border-white/10">
                <p className="text-[#D4AF37] font-bold uppercase text-[9px] font-mono tracking-[0.2em]">
                  LOCATED IN SVB MALL
                </p>
                <p className="text-white text-xs font-light mt-1 leading-relaxed">
                  1st Floor, beside Mayura Hotel, opposite RTC bus station, Vizianagaram.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours and Map Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 font-sans">
          {/* Operating hours list */}
          <div className="lg:col-span-4 bg-[#080808] border border-white/10 p-6 sm:p-8 rounded-none space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold">Hours & Availability</h4>
              </div>
              <p className="text-zinc-500 text-xs font-light leading-relaxed">
                Chaitra Beauty Zone is open daily to accommodate working professionals and grand weekend wedding schedules. For bridal packages, we recommend reserving 4 weeks in advance.
              </p>
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-zinc-500 text-xs uppercase tracking-wide">Monday - Friday</span>
                  <span className="text-white font-mono text-xs">9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-zinc-500 text-xs uppercase tracking-wide">Saturday</span>
                  <span className="text-white font-mono text-xs">9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-zinc-500 text-xs text-[#D4AF37] uppercase tracking-wide">Sunday</span>
                  <span className="text-[#D4AF37] font-mono text-xs">9:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-3">
              <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] block uppercase font-bold">
                Direct Appointment Hotline
              </span>
              <a
                href={`tel:${SALON_DETAILS.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 text-white hover:text-[#D4AF37] font-bold text-sm tracking-wide transition-all"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                {SALON_DETAILS.phone}
              </a>
            </div>
          </div>

          {/* Interactive Google Map of SVB Mall Vizianagaram */}
          <div className="lg:col-span-8 bg-[#080808] border border-white/10 rounded-none overflow-hidden p-3 h-96 min-h-[380px] flex flex-col">
            <div className="flex items-center gap-2 mb-3 px-3 pt-2 text-zinc-400 text-[10px] font-mono uppercase tracking-widest">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>Location Mapping & Navigation</span>
            </div>
            {/* Embedded maps iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15194.729188059085!2d83.4116812!3d18.1105953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3bfba1a6449175%3A0xc3485ae90e59990e!2sChaitra%20beauty%20zone!5e0!3m2!1sen!2sin!4v1717596000000!5m2!1sen!2sin"
              title="Chaitra Beauty Zone Map"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "0px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="flex-1 filter grayscale invert opacity-60 focus:opacity-100 transition-all rounded-none"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

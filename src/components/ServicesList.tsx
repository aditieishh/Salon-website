/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Search, Clock, Sparkles, Flame, Check, Tag } from "lucide-react";
import { SALON_SERVICES } from "../data";
import { ServiceCategory, SalonService } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ServicesListProps {
  onServiceSelect: (service: SalonService) => void;
}

export default function ServicesList({ onServiceSelect }: ServicesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    return ["All", ...Object.values(ServiceCategory)];
  }, []);

  const filteredServices = useMemo(() => {
    return SALON_SERVICES.filter((ser) => {
      const matchSearch =
        ser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ser.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === "All" || ser.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div id="services-pane" className="py-12 sm:py-20 bg-[#050505] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 font-sans">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            EXQUISITE TREATMENT CATALOG
          </span>
          <h2 className="text-3xl sm:text-5xl font-light uppercase mt-3 tracking-widest">
            Our Luxury <span className="italic font-serif text-[#D4AF37] capitalize">Services</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4 opacity-50" />
          <p className="text-zinc-500 text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
            We merge modern Parisian hair techniques with ancient Indian wedding henna artistry, customized tailoring, and state-of-the-art beauty restoration.
          </p>
        </div>

        {/* Search and Filters Toolbar */}
        <div className="flex flex-col gap-6 mb-12 font-sans">
          {/* Search Box */}
          <div className="relative max-w-lg mx-auto w-full">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search bridal mehendi, haircut, tailoring..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-3.5 pl-12 pr-4 text-sm text-white placeholder-zinc-650 focus:border-[#D4AF37] outline-none transition-all duration-300 font-light"
            />
          </div>

          {/* Categories Horizontal Pills Scroll */}
          <div className="flex flex-wrap justify-center gap-2 overflow-x-auto py-2 px-1 max-w-5xl mx-auto">
            {categories.map((cat) => {
              const count = cat === "All" 
                ? SALON_SERVICES.length 
                : SALON_SERVICES.filter(s => s.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`cat-btn-${cat.replace(/\s+/g, "-")}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-none text-[10px] uppercase tracking-widest font-bold transition-all whitespace-nowrap cursor-pointer border ${
                    isActive
                      ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-black/80"
                      : "bg-[#0c0c0c] text-zinc-400 hover:text-white hover:bg-[#111] border-white/10"
                  }`}
                >
                  {cat} <span className={`ml-1 text-[9px] font-mono ${isActive ? "text-black" : "text-zinc-600"}`}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Render Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-sans">
          <AnimatePresence mode="popLayout">
            {filteredServices.length > 0 ? (
              filteredServices.map((ser, idx) => (
                <motion.div
                  key={ser.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#080808] w-full overflow-hidden rounded-none border border-white/10 hover:border-[#D4AF37]/35 transition-all duration-500 flex flex-col group"
                >
                  {/* Service Image Block */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={ser.image}
                      alt={ser.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Dark gradient mapping on top of image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

                    {/* Popular / Premium tag */}
                    {ser.popular && (
                      <div className="absolute top-4 right-4 bg-[#D4AF37] text-black px-3 py-1 rounded-none text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-black" />
                        Popular
                      </div>
                    )}

                    {/* Category Label */}
                    <span className="absolute bottom-4 left-4 bg-black/80 text-[#D4AF37] border border-[#D4AF37]/20 px-2.5 py-1 rounded-none text-[9px] font-mono uppercase tracking-widest font-semibold">
                      {ser.category}
                    </span>
                  </div>

                  {/* Core Service Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-base font-medium tracking-wide text-white group-hover:text-[#D4AF37] transition-colors uppercase">
                          {ser.name}
                        </h3>
                      </div>
                      <p className="text-zinc-500 text-xs leading-relaxed font-light line-clamp-3">
                        {ser.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-1">
                      {/* Price & Duration details row */}
                      <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider pt-3.5 border-t border-white/10">
                        <div className="flex items-center gap-1.5 text-zinc-500">
                          <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{ser.duration}</span>
                        </div>
                        <div className="text-[#D4AF37] font-bold bg-[#D4AF37]/5 px-2.5 border border-[#D4AF37]/10 py-1 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {ser.price}
                        </div>
                      </div>

                      {/* Direct Booking Shortcut Button */}
                      <button
                        onClick={() => onServiceSelect(ser)}
                        className="w-full py-3 px-4 rounded-none text-[10px] uppercase tracking-widest font-bold bg-transparent text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Select & Book
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-[#080808] rounded-none border border-white/5 border-dashed font-sans">
                <Sparkles className="w-12 h-12 text-zinc-700 mx-auto mb-4 animate-pulse" />
                <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider">No matching services found.</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider hover:underline"
                >
                  Reset parameters
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { X, Sparkles, AlertCircle, Play, ZoomIn, Eye, Calendar } from "lucide-react";
import { PORTFOLIO_ITEMS } from "../data";
import { ServiceCategory, PortfolioItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface GallerySectionProps {
  onBookLook: (categoryName: string, lookTitle: string) => void;
}

export default function GallerySection({ onBookLook }: GallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filters = useMemo(() => {
    return ["All", ServiceCategory.HAIR, ServiceCategory.MAKEUP, ServiceCategory.MEHENDI, ServiceCategory.TAILORING];
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <div id="gallery-container" className="py-12 sm:py-20 bg-[#050505] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Caption */}
        <div className="text-center max-w-3xl mx-auto mb-16 font-sans">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            ARTISTRY & EXPRESSION
          </span>
          <h2 className="text-3xl sm:text-5xl font-light uppercase mt-3 tracking-widest">
            Our Master <span className="italic font-serif text-[#D4AF37] capitalize">Portfolio</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4 opacity-50" />
          <p className="text-zinc-500 text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
            Each creation is a masterwork of tailored geometry, luxury pigments, organic henna colors, and flawless hair dimensions.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 font-sans">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-none text-[10px] uppercase tracking-widest font-bold cursor-pointer transition-all border ${
                activeFilter === filter
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-black/80"
                  : "bg-[#0c0c0c] text-zinc-400 hover:text-white border-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px] font-sans">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              // Create dynamic spans for the bento layout grid variation
              const gridSpans = 
                idx === 0 ? "lg:col-span-2 lg:row-span-2" :
                idx === 3 ? "lg:row-span-2" :
                idx === 5 ? "lg:col-span-2" : "";

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedItem(item)}
                  className={`relative overflow-hidden rounded-none group border border-white/10 hover:border-[#D4AF37]/30 cursor-pointer shadow-none ${gridSpans}`}
                >
                  {/* Portfolio Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark overlay with info displayed on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10" />

                  {/* Hover contents */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 z-15 pointer-events-none">
                    {/* Top action indicator */}
                    <div className="self-end bg-black/80 backdrop-blur-md p-2 rounded-none border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="w-4.5 h-4.5 text-[#D4AF37]" />
                    </div>

                    {/* Bottom identity */}
                    <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 font-sans">
                      <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-2 py-0.5 rounded-none uppercase">
                        {item.category}
                      </span>
                      <h4 className="text-white font-medium text-base mt-2 tracking-wide uppercase">
                        {item.title}
                      </h4>
                      <p className="text-zinc-400 text-xs mt-1 font-light line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Tiny icon wrapper in passive/mobile state */}
                  <div className="absolute bottom-4 left-4 bg-[#050505]/95 px-2.5 py-1.5 rounded-none border border-white/10 text-[9px] font-mono tracking-widest text-zinc-300 group-hover:hidden transition-all uppercase flex items-center gap-1.5 font-semibold">
                    <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                    View Look
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Lightbox Pop-up Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6"
            >
              {/* Box container */}
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-[#080808] border border-white/10 rounded-none w-full max-w-4xl overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-12 font-sans"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-50 p-2.5 rounded-none bg-black/80 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-white/10 text-xs font-bold uppercase tracking-widest"
                >
                  <X className="w-5 h-5 text-[#D4AF37]" />
                </button>

                {/* Left side: Premium Image View */}
                <div id="lightbox-image" className="md:col-span-7 h-80 sm:h-96 md:h-full relative overflow-hidden bg-black">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/85 px-3 py-1.5 rounded-none border border-white/10 text-[9px] font-mono text-[#D4AF37] tracking-widest">
                    ID_CODE: CZ_PORT_{selectedItem.id.toUpperCase()}
                  </div>
                </div>

                {/* Right side: Look Metadata and Action */}
                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-3 py-1 rounded-none text-[9px] font-mono font-semibold text-[#D4AF37] tracking-widest uppercase">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      {selectedItem.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-light text-white uppercase leading-tight tracking-wide">
                      {selectedItem.title}
                    </h3>
                    <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-light">
                      {selectedItem.description}
                    </p>
                    <div className="bg-[#030303] p-4 rounded-none border border-white/10 space-y-1.5">
                      <h5 className="text-[9px] uppercase font-mono tracking-widest text-[#D4AF37] font-bold">
                        Techniques Incorporated
                      </h5>
                      <p className="text-zinc-400 text-xs font-light leading-relaxed">
                        Premium hydration primers, organic active dyes, custom stitch spacing, high-temperature setting, double symmetry geometry.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => {
                        onBookLook(selectedItem.category, selectedItem.title);
                        setSelectedItem(null);
                      }}
                      className="w-full py-4 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold text-[11px] uppercase tracking-widest hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Book This Look
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedItem(null)}
                      className="w-full py-3 bg-transparent border border-white/10 text-zinc-400 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Return to Showcase
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

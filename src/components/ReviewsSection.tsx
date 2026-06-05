/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Star, MessageSquare, AlertCircle, CheckCircle2, User, HelpCircle, Loader2 } from "lucide-react";
import { getReviews, addReview, isFirebaseActive } from "../db";
import { Review } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form States
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [errorWord, setErrorWord] = useState("");

  // Fetch reviews on mount
  useEffect(() => {
    async function load() {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !text.trim()) {
      setErrorWord("Please populate all fields first!");
      return;
    }
    if (authorName.length < 2) {
      setErrorWord("Name must be at least 2 characters.");
      return;
    }
    if (text.length < 10) {
      setErrorWord("Please write at least 10 letters describing your experience!");
      return;
    }

    setSubmitting(true);
    setErrorWord("");
    try {
      const added = await addReview({ authorName, rating, text });
      setReviews((prev) => [added, ...prev]);
      setSuccess(true);
      setAuthorName("");
      setText("");
      setRating(5);
    } catch (err: any) {
      console.error(err);
      setErrorWord("Submission rejected. Please check fields or rules formatting.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="reviews-pane" className="py-12 sm:py-20 bg-[#050505] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Caption */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            CLIENT CONFIDENCE & TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-5xl font-light uppercase mt-3 tracking-widest">
            Customer <span className="italic font-serif text-[#D4AF37] capitalize">Reviews</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4 opacity-50" />
          <p className="text-zinc-500 text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
            Read real, unfiltered testimonials gathered from local Google listings confirming our absolute commitment to style quality, mehendi stains, and tailor fits.
          </p>
        </div>

        {/* Dashboard Grid Card for stats */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* Rating Summary Box (left side) */}
          <div className="md:col-span-5 bg-[#080808] border border-white/10 p-8 rounded-none text-center space-y-4">
            <h4 className="text-[10px] font-mono uppercase text-[#D4AF37] tracking-[0.2em] font-bold">
              Google Verified Score
            </h4>
            <div className="space-y-1">
              <span className="text-6xl sm:text-7.5xl font-light font-sans tracking-tight text-white block">
                5.0
              </span>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
            </div>
            <p className="text-zinc-500 text-xs font-light leading-relaxed">
              Based on over <b>310+ customer ratings</b> with a 100% satisfaction record for mehendi art, haircuts, and bridal makeup in the RTC area.
            </p>

            <div className="pt-4 border-t border-white/5 space-y-2.5 text-left text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
              <div className="flex justify-between">
                <span>Excellent / Bridal Work:</span>
                <span className="text-[#D4AF37]">100%</span>
              </div>
              <div className="flex justify-between">
                <span>Value for Cost:</span>
                <span className="text-[#D4AF37]">100%</span>
              </div>
              <div className="flex justify-between">
                <span>Staff & Warmth:</span>
                <span className="text-[#D4AF37]">100%</span>
              </div>
            </div>
          </div>

          {/* New Review Submission Box (right side) */}
          <div id="add-review-block" className="md:col-span-7 bg-[#080808] border border-white/10 p-6 sm:p-8 rounded-none space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-bold flex items-center gap-2">
              <MessageSquare className="w-4.5 h-4.5 text-[#D4AF37]" />
              Share Your Salon Experience
            </h4>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/10 border border-emerald-500/20 rounded-none p-6.5 text-center space-y-3"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h5 className="text-xs font-bold text-white uppercase tracking-wider">Thank you!</h5>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  Your premium review has been submitted successfully. It is now persistent on our {isFirebaseActive ? "Firestore cloud backend" : "local active state storage"}.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider hover:underline"
                >
                  Post another review
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Author Name */}
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    required
                    maxLength={60}
                    className="w-full bg-[#050505] border border-white/10 rounded-none px-4 py-3 text-xs placeholder-zinc-700 outline-none text-white focus:border-[#D4AF37]/50 transition-all font-light"
                  />
                </div>

                {/* Star selection */}
                <div className="space-y-1.5 flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-bold tracking-wider">Your Scale Rating</span>
                  <div className="flex gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((starIdx) => {
                      const isActive = hoverRating !== null ? starIdx <= hoverRating : starIdx <= rating;
                      return (
                        <button
                          key={starIdx}
                          type="button"
                          onClick={() => setRating(starIdx)}
                          onMouseEnter={() => setHoverRating(starIdx)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="focus:outline-none p-1 shrink-0 cursor-pointer"
                        >
                          <Star
                            className={`w-6.5 h-6.5 transition-colors ${
                              isActive ? "fill-[#D4AF37] text-[#D4AF37]" : "text-zinc-800"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider">Review text</label>
                  <textarea
                    rows={3}
                    placeholder="Describe our services, mehendi durability, staff reception, haircut styling or tailoring fit..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    maxLength={600}
                    className="w-full bg-[#050505] border border-white/10 rounded-none p-4 text-xs placeholder-zinc-700 outline-none text-white focus:border-[#D4AF37]/50 transition-all resize-none font-light"
                  />
                </div>

                {/* Error Banner */}
                {errorWord && (
                  <div className="bg-red-500/10 border border-red-500/20 text-xs text-red-400 p-3 rounded-none flex items-center gap-2">
                    <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                    <span>{errorWord}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold text-[11px] uppercase tracking-widest hover:scale-[1.01] transition-all disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin text-black" />}
                  {submitting ? "Publish Review..." : "Publish Review"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Display Reviews Lists */}
        <div className="space-y-6 flex flex-col pt-4">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
              Review Feed Logs ({reviews.length})
            </h4>
            <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">SORTED_BY: RECENT_DESC</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout animate-stagger">
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37] mx-auto" />
                  <p className="text-zinc-500 text-[10px] font-mono mt-3 uppercase tracking-wider">Syncing reviews from backend database...</p>
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((rev, idx) => (
                  <motion.div
                    key={rev.id || idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#0c0c0c] border border-white/10 p-6 rounded-none flex flex-col justify-between hover:border-[#D4AF37]/20 hover:bg-[#111] transition-all duration-300"
                  >
                    <div className="space-y-4">
                      {/* Rating and date row */}
                      <div className="flex justify-between items-center">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-4 h-4 ${
                                s <= rev.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-zinc-850"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono">{rev.date}</span>
                      </div>

                      {/* Text */}
                      <p className="text-zinc-400 text-xs font-light leading-relaxed line-clamp-4 italic">
                        "{rev.text}"
                      </p>
                    </div>

                    {/* Review Author profile */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-4">
                      {rev.avatar ? (
                        <img
                          src={rev.avatar}
                          alt={rev.authorName}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full object-cover border border-white/10"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center border border-white/10">
                          <User className="w-4 h-4 text-zinc-650" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h5 className="text-xs font-medium text-white">{rev.authorName}</h5>
                          {rev.verified && (
                            <span className="text-[8px] bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded-none uppercase font-mono font-bold tracking-widest">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Chaitra Patron</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-10 bg-[#080808] rounded-none border border-dashed border-white/5 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  No customer reviews yet. Be the first to publish!
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

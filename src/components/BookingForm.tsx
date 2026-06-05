/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Calendar as LucideCalendar, Clock, User, Phone, Mail, FileText, CheckCircle2, MessageSquare, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { SALON_SERVICES, SALON_DETAILS } from "../data";
import { addAppointment } from "../db";
import { SalonService } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface BookingFormProps {
  preselectedServiceId: string;
  clearPreselectedService: () => void;
}

export default function BookingForm({ preselectedServiceId, clearPreselectedService }: BookingFormProps) {
  // Form states
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [bookedData, setBookedData] = useState<any>(null);

  // Load preselected service
  useEffect(() => {
    if (preselectedServiceId) {
      setServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  // Available Time Slots for scheduling
  const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM", "07:30 PM"];

  // Direct WhatsApp Book without form completion
  const handleDirectWhatsAppBook = () => {
    const selectedService = SALON_SERVICES.find((s) => s.id === serviceId);
    const serviceString = selectedService ? selectedService.name : "Hair & Beauty Session";
    const dateString = date ? ` on ${date}` : "";
    const slotString = timeSlot ? ` at ${timeSlot}` : "";
    
    // Create WhatsApp text draft
    const text = encodeURIComponent(
      `Hi Chaitra Beauty Zone! I would like to book a quick inquiry reservation for "${serviceString}"${dateString}${slotString}. Please let me know if you have an open slot!`
    );
    window.open(`https://wa.me/${SALON_DETAILS.whatsappPhone.replace("+", "")}?text=${text}`, "_blank");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");

    if (!customerName || !email || !phone || !serviceId || !date || !timeSlot) {
      setErrorText("Please populate all required fields before confirming!");
      return;
    }

    const selectedService = SALON_SERVICES.find((s) => s.id === serviceId);
    if (!selectedService) {
      setErrorText("Unknown service selection.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        customerName,
        email,
        phone,
        serviceId,
        serviceName: selectedService.name,
        date,
        time: timeSlot,
        notes,
        createdAt: new Date().toISOString(),
        status: "pending" as const
      };

      const result = await addAppointment(payload);

      // Submit submission payload to Formspree
      try {
        await fetch("https://formspree.io/f/xykazrnb", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: customerName,
            email: email,
            phone: phone,
            service: selectedService.name,
            date: date,
            time: timeSlot,
            notes: notes || "No additional notes",
            appointmentId: result?.id || "Local Persistence"
          })
        });
      } catch (formspreeErr) {
        console.error("Formspree notification push failed:", formspreeErr);
      }

      setBookedData(result);
      setSuccess(true);
      
      // Clear inputs
      setCustomerName("");
      setEmail("");
      setPhone("");
      setServiceId("");
      setDate("");
      setTimeSlot("");
      setNotes("");
      clearPreselectedService();
    } catch (err: any) {
      console.error(err);
      setErrorText("Database synchronization failed. Please check field formats or permission layers.");
    } finally {
      setLoading(false);
    }
  };

  // WhatsApp Sync helper after successful database booking
  const getSuccessWhatsAppLink = () => {
    if (!bookedData) return "";
    const text = encodeURIComponent(
      `Hi Chaitra Beauty Zone! My name is ${bookedData.customerName}. I just booked an online appointment for "${bookedData.serviceName}" on ${bookedData.date} at ${bookedData.time}. Please confirm my seat! ID: ${bookedData.id}`
    );
    return `https://wa.me/${SALON_DETAILS.whatsappPhone.replace("+", "")}?text=${text}`;
  };

  return (
    <div id="booking-container" className="py-12 sm:py-20 bg-[#050505] text-white min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 w-full">
        
        {/* Caption */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            REAL-TIME RESERVATIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-light uppercase mt-2 tracking-widest">
            Book <span className="italic font-serif text-[#D4AF37] capitalize">Appointment</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4 opacity-50" />
          <p className="text-zinc-500 text-xs sm:text-sm mt-4 font-light max-w-md mx-auto tracking-wide leading-relaxed">
            Fill the secure digital sheet below to persist your styling seat in our cloud directory, or connect through WhatsApp instantly for speedy custom scheduling.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
          
          {/* Main Form (Left) */}
          <div className="lg:col-span-8 bg-[#080808] border border-white/10 rounded-none p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 py-8 text-center"
                >
                  <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto shadow-xl shadow-[#D4AF37]/5">
                    <CheckCircle2 className="w-10 h-10 text-[#D4AF37]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-light text-white uppercase tracking-wider">
                      Appointment Submitted!
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light max-w-md mx-auto">
                      Your booking has been written to our secure Firestore directory. Our team has received your styling request.
                    </p>
                  </div>

                  {/* Summary ticket detail */}
                  {bookedData && (
                    <div className="bg-black p-5 rounded-none border border-white/10 text-left space-y-2 max-w-md mx-auto text-xs font-mono">
                      <div className="flex justify-between border-b border-white/10 pb-1.5">
                        <span className="text-zinc-500">Ticket ID:</span>
                        <span className="text-[#D4AF37] font-bold">{bookedData.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Client:</span>
                        <span className="text-white">{bookedData.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Service:</span>
                        <span className="text-white">{bookedData.serviceName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Schedule:</span>
                        <span className="text-[#D4AF37] font-bold">
                          {bookedData.date} @ {bookedData.time}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1.5 border-t border-white/10">
                        <span className="text-zinc-500">Status:</span>
                        <span className="text-emerald-400 blink uppercase tracking-wider text-[10px] font-bold">PENDING_CONFIRM</span>
                      </div>
                    </div>
                  )}

                  {/* Action Sync to WhatsApp */}
                  <div className="space-y-3 pt-4 max-w-md mx-auto">
                    <a
                      href={getSuccessWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-white/10" />
                      Sync with Salon WhatsApp
                    </a>
                    <button
                      onClick={() => setSuccess(false)}
                      className="text-xs text-[#D4AF37] hover:underline font-bold focus:outline-none"
                    >
                      Process another booking
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                    Online Scheduling Sheet
                  </h4>

                  {/* Customer Identity Split */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/80 font-bold flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Ananya Sharma"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm focus:border-[#D4AF37] outline-none text-white placeholder-zinc-700 transition-all font-light"
                      />
                    </div>
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/80 font-bold flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Phone Contacts *
                      </label>
                      <input
                        type="tel"
                        placeholder="077020 42704"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm focus:border-[#D4AF37] outline-none text-white placeholder-zinc-700 transition-all font-light"
                      />
                    </div>
                  </div>

                  {/* Email & Service Split */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/80 font-bold flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="ananya@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm focus:border-[#D4AF37] outline-none text-white placeholder-zinc-700 transition-all font-light"
                      />
                    </div>

                    {/* Service Drops List */}
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/80 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Desired Treatment *
                      </label>
                      <select
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        required
                        className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm focus:border-[#D4AF37] outline-none text-white focus:ring-0 transition-all cursor-pointer appearance-none font-light"
                      >
                        <option value="" disabled className="text-zinc-600 bg-black">Select treatment</option>
                        {SALON_SERVICES.map((s) => (
                          <option key={s.id} value={s.id} className="bg-black text-white">
                            {s.name} ({s.price})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Calendar Pick Date */}
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/80 font-bold flex items-center gap-1.5">
                      <LucideCalendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Select Date *
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm focus:border-[#D4AF37] outline-none text-white focus:ring-0 transition-all cursor-pointer font-light"
                    />
                  </div>

                  {/* Time slots Selector */}
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/80 font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Preferred Time Block *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => {
                        const isSelected = timeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTimeSlot(slot)}
                            className={`py-2 text-[10px] uppercase font-bold text-center tracking-widest transition-all cursor-pointer border ${
                              isSelected
                                ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                                : "bg-transparent border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Notes */}
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/80 font-bold flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Bespoke Notes / Requirements (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="E.g., specific mehendi design references, Maggam stone colors..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#D4AF37] p-4 text-xs text-white placeholder-zinc-650 focus:outline-none transition-all resize-none font-light"
                    />
                  </div>

                  {errorText && (
                    <div className="bg-red-500/10 border border-red-500/20 text-xs text-red-400 p-3 rounded-none flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorText}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#D4AF37] text-black font-bold text-[11px] uppercase tracking-widest hover:bg-[#D4AF37]/90 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin text-black" />}
                    {loading ? "Registering on Cloud..." : "Confirm Booking"}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Support & WhatsApp Sidecar (Right) */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            {/* Quick WhatsApp Block */}
            <div className="bg-[#080808] border border-white/10 p-6 sm:p-8 rounded-none space-y-5 text-center">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-full p-3.5 w-14 h-14 flex items-center justify-center mx-auto">
                <MessageSquare className="w-7 h-7 text-emerald-400 fill-[#25D366]/5" strokeWidth={1.8} />
              </div>
              <div className="space-y-1.5">
                <h5 className="text-xs font-bold uppercase text-white tracking-widest">
                  WhatsApp Inquiry
                </h5>
                <p className="text-zinc-500 text-[11px] font-light leading-relaxed">
                  Prefer directly consulting? Select your desired service and date above, then click to instantly dispatch a draft booking directly to the salon owner.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDirectWhatsAppBook}
                className="w-full py-3 border border-[#25D366]/30 text-[#25D366] text-[11px] font-bold uppercase tracking-widest hover:bg-[#25D366]/5 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-[#25D366]/10" />
                WhatsApp Inquiry
              </button>
            </div>

            {/* Quick Contact Specs */}
            <div className="bg-[#080808] border border-white/10 p-6 sm:p-8 rounded-none space-y-5">
              <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                Venue Details
              </h5>
              <div className="space-y-4 text-xs text-zinc-400 font-light leading-relaxed">
                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-widest text-[#D4AF37]">Location</p>
                  <p className="text-[11px] leading-tight text-gray-400">1st Floor, SVB MALL, <br/>Market Area, Vizianagaram</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-widest text-[#D4AF37]">Hours</p>
                  <p className="text-[11px] text-gray-400">Mon-Sun: 9:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

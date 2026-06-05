/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ServiceCategory {
  HAIR = "Hair Care & Styling",
  MAKEUP = "Bridal & Makeover",
  MEHENDI = "Mehendi & Henna Art",
  TAILORING = "Maggam Work & Tailoring",
  WELLNESS = "Health & Beauty Care",
  REPAIR = "Specialty Services"
}

export interface SalonService {
  id: string;
  name: string;
  category: ServiceCategory;
  price: string; // E.g., "$40+", "Starting at ₹1,500"
  duration: string; // E.g., "45 mins"
  description: string;
  image: string; // Image placeholder or generated visual
  popular?: boolean;
}

export interface Appointment {
  id?: string;
  customerName: string;
  email: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export interface Review {
  id?: string;
  authorName: string;
  rating: number; // 1-5
  text: string;
  date: string;
  avatar?: string;
  verified?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  image: string;
  videoUrl?: string; // For simulating high premium video overlays
}

export interface SalonDetails {
  name: string;
  rating: number;
  reviewsCount: number;
  phone: string;
  whatsappPhone: string; // For WhatsApp direct link
  address: string;
  addressShort: string;
  hours: string;
  socials: {
    instagram: string;
    facebook: string;
    justdial: string;
  };
}

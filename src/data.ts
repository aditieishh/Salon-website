/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SalonService, ServiceCategory, PortfolioItem, Review, SalonDetails } from "./types";

export const SALON_DETAILS: SalonDetails = {
  name: "Chaitra Beauty Zone",
  rating: 5.0,
  reviewsCount: 310,
  phone: "077020 42704",
  whatsappPhone: "+917702042704", // Safe international format for whatsapp link
  address: "1st Floor, SVB MALL, beside mayura hotel, RTC Complex Area, Siddarth Nagar, Balaji Nagar, Vizianagaram, Andhra Pradesh 535003",
  addressShort: "SVB MALL, beside Mayura Hotel, RTC Complex Area, Vizianagaram",
  hours: "9:00 AM - 9:00 PM (Everyday)",
  socials: {
    instagram: "https://instagram.com/chaitrabeautyzone",
    facebook: "https://facebook.com/chaitrabeautyzone",
    justdial: "https://www.justdial.com/Vizianagaram/Chaitra-beauty-zone-Vizianagaram-rtc-Busstand/0892PXX892-XX892-181123134958-L2H9_BZDET"
  }
};

export const SALON_SERVICES: SalonService[] = [
  // Hair Category
  {
    id: "hair-cut-premium",
    name: "Couture Haircut & Styling",
    category: ServiceCategory.HAIR,
    price: "₹499 - ₹899",
    duration: "45 mins",
    description: "Personalized cut, designer wash, and high-gloss blowout customized to your hair texture and face structure.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600",
    popular: true
  },
  {
    id: "hair-color-balayage",
    name: "Luxury Balayage & Highlights",
    category: ServiceCategory.HAIR,
    price: "₹2,499+",
    duration: "150 mins",
    description: "Premium safe-to-hair color dyes giving visual depth, sun-kissed reflection, and luxury keratin hair sealing.",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "hair-spa-protein",
    name: "Deep Hydration Protein Spa",
    category: ServiceCategory.HAIR,
    price: "₹999+",
    duration: "60 mins",
    description: "Revitalize brittle hair with essential nourishment, scalp relaxation massage, and high-frequency steam therapy.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    popular: true
  },
  // Makeup Category
  {
    id: "makeup-bridal-hd",
    name: "Bridal HD Makeup Package",
    category: ServiceCategory.MAKEUP,
    price: "₹7,999+",
    duration: "180 mins",
    description: "Flawless watermark-proof high-definition makeup with professional contouring, premium lash extensions, and draping.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600",
    popular: true
  },
  {
    id: "makeup-celebrity-look",
    name: "Glamour Makeup & Hairstyling",
    category: ServiceCategory.MAKEUP,
    price: "₹2,999+",
    duration: "90 mins",
    description: "Editorial style party makeover ideal for grand receptions, visual portfolios, and evening celebrations.",
    image: "https://images.unsplash.com/photo-1522337040776-83958a1eb396?auto=format&fit=crop&q=80&w=600"
  },
  // Mehendi Category
  {
    id: "mehendi-bridal-full",
    name: "Imperial Bridal Mehendi",
    category: ServiceCategory.MEHENDI,
    price: "₹3,499 - ₹9,999",
    duration: "240 mins",
    description: "Intricate historical bridal story motifs from fingers to elbows and matching elegant leg detailing using 100% organic henna.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
    popular: true
  },
  {
    id: "mehendi-arabic-fusion",
    name: "Arabic Fusion Henna Design",
    category: ServiceCategory.MEHENDI,
    price: "₹499+",
    duration: "60 mins",
    description: "Bold decorative silhouettes, floral leafy vines, and shaded geometric spaces that leave a deep dark stain.",
    image: "https://images.unsplash.com/photo-1590156546746-c233053c1e80?auto=format&fit=crop&q=80&w=600"
  },
  // Tailoring & Maggam Category
  {
    id: "maggam-heavy-work",
    name: "Exquisite Maggam Hand-Embroidery",
    category: ServiceCategory.TAILORING,
    price: "₹2,999+",
    duration: "4-7 Days",
    description: "Traditional Zardosi embroidery, visual beadworks, stone works, and silk thread creations done on luxury custom blouses.",
    image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80&w=600",
    popular: true
  },
  {
    id: "tailoring-designer-blouse",
    name: "Premium Designer Tailoring & Stitching",
    category: ServiceCategory.TAILORING,
    price: "Halfsleeve: ₹799+",
    duration: "3 Days",
    description: "Impeccably tailored designer blouses, lehengas, and ethnic wear with customized fits and modern padding configurations.",
    image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&q=80&w=600"
  },
  // Repair / Specialty Category
  {
    id: "earlobe-repair-seamless",
    name: "Aesthetic Earlobe Repairing (No-stitch)",
    category: ServiceCategory.REPAIR,
    price: "₹1,499",
    duration: "30 mins",
    description: "Safe, rapid, painless and stitch-less technique to close widened or torn ear lobes with high cosmetic precision.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600"
  },
  // Wellness / Health Beauty Category
  {
    id: "beauty0-skin-facial",
    name: "Premium Radiance Face Therapy",
    category: ServiceCategory.WELLNESS,
    price: "₹1,199+",
    duration: "75 mins",
    description: "Skin whitening and cellular rejuvenation facial using professional medical-grade serums, fruit bio-extracts, and visual masks.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600"
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p1",
    title: "Traditional Bridal Mehendi Splendor",
    category: ServiceCategory.MEHENDI,
    description: "Deep red stained floral and elephant motif story-henna from the elbows to finger-tips.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "p2",
    title: "Heavy Royal Bridal Maggam Work",
    category: ServiceCategory.TAILORING,
    description: "Intricately woven golden zardosi embroidery with pearl embellishments on premium silk blouse fabric.",
    image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "p3",
    title: "Elegant Layered Hair Cut & Blown Finish",
    category: ServiceCategory.HAIR,
    description: "Clean framing face layers with visual volumetric shine and customized color highlight accents.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "p4",
    title: "Flawless HD Royal Bridal Glow Makeover",
    category: ServiceCategory.MAKEUP,
    description: "Dewy airbrushed bridal makeup base paired with customized Indian jewelry accenting.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "p5",
    title: "Arabic Floral Back-Hand Henna Arch",
    category: ServiceCategory.MEHENDI,
    description: "Modern minimalist Arabic arches and leaf trail lines on hands, ideal for dynamic party attendees.",
    image: "https://lh3.googleusercontent.com/d/15GKDQodTLBoTjortV4UjIVXNnP8omgDz"
  },
  {
    id: "p6",
    title: "Golden Beadwork Maggam Designer Blouse",
    category: ServiceCategory.TAILORING,
    description: "Exquisite hand embroidery detailing around high neckline and sleeves for dynamic wedding looks.",
    image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "p7",
    title: "Seamless Pearl Hair Bun with Rose Accents",
    category: ServiceCategory.HAIR,
    description: "Classic Indian bridal bun styled with fresh red roses and fine pearl mesh nets.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "p8",
    title: "Anti-Aging Glow Fruit Facial",
    category: ServiceCategory.WELLNESS,
    description: "Deep skin nourishment and cell tightening facial, revealing immediate organic glow.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600"
  }
];

export const GOOGLE_REVIEWS: Review[] = [
  {
    id: "rev-1",
    authorName: "Ananya S.",
    rating: 5,
    text: "Excellent Staff.. reasonable costs .. Maggam work on my bridal blouse was absolutely superb! Outstanding reception and care.",
    date: "2 days ago",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
    verified: true
  },
  {
    id: "rev-2",
    authorName: "Kalyani V.",
    rating: 5,
    text: "Gud service, quality products and nice receiving 👌👌👌🥰. They did my bridal mehendi, and it was so dark and beautiful. Everyone praised it!",
    date: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
    verified: true
  },
  {
    id: "rev-3",
    authorName: "Priyanjana Roy",
    rating: 5,
    text: "Excellent hair style,the best price I am very happy 🥰🥳. Staff behaves politely and details are explained clearly. Highly recommended!",
    date: "3 weeks ago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
    verified: true
  },
  {
    id: "rev-4",
    authorName: "Sri Latha",
    rating: 5,
    text: "Their earlobe repairing service is completely painless! No stitches, healed brilliantly in just days. Very trustworthy beauty zone in Vizianagaram.",
    date: "1 month ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80",
    verified: true
  }
];

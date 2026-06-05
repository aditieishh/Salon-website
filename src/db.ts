/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Firestore
} from "firebase/firestore";
import firebaseConfig from "./firebase-applet-config.json";
import { Appointment, Review } from "./types";
import { GOOGLE_REVIEWS } from "./data";

// 1. Establish OperationType Enum for Security Compliance
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

// Check if credentials inside firebaseConfig are real
const isRealConfig = 
  firebaseConfig && 
  firebaseConfig.apiKey && 
  !firebaseConfig.apiKey.includes("PLACEHOLDER") &&
  firebaseConfig.projectId &&
  !firebaseConfig.projectId.includes("PLACEHOLDER");

let firebaseApp = null;
export let db: Firestore | null = null;
export let auth: any = null;
export let isFirebaseActive = false;

if (isRealConfig) {
  try {
    firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
    auth = getAuth(firebaseApp);
    isFirebaseActive = true;
    console.log("Firebase initialized successfully in Chaitra Beauty Zone.");
  } catch (err) {
    console.error("Firebase failed to initialize, falling back to local database:", err);
    isFirebaseActive = false;
  }
} else {
  console.warn("Using local database mode (Firebase configuration has placeholder values).");
}

// 2. Implement Mandatory Error Handler
function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Local storage helper keys
const APPOINTMENTS_KEY = "chaitra_appointments_v1";
const REVIEWS_KEY = "chaitra_reviews_v1";

// 3. Main Data Layer Actions
// Get Reviews
export async function getReviews(): Promise<Review[]> {
  // If Firebase is active, fetch from Firestore
  if (isFirebaseActive && db) {
    const path = "reviews";
    try {
      const q = query(collection(db, path), orderBy("createdAt", "desc"), limit(20));
      const querySnapshot = await getDocs(q);
      const reviewsList: Review[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        reviewsList.push({
          id: doc.id,
          authorName: data.authorName,
          rating: Number(data.rating),
          text: data.text,
          date: data.date || "Recent",
          avatar: data.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80",
          verified: data.verified ?? true
        });
      });
      // If we don't have enough cloud reviews, return combined with fallback google reviews
      if (reviewsList.length === 0) {
        return GOOGLE_REVIEWS;
      }
      return reviewsList;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  }

  // Local storage fallback
  const stored = localStorage.getItem(REVIEWS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return GOOGLE_REVIEWS;
    }
  }
  
  // Save default reviews initially
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(GOOGLE_REVIEWS));
  return GOOGLE_REVIEWS;
}

// Add Review
export async function addReview(reviewData: { authorName: string; rating: number; text: string }): Promise<Review> {
  const newReview: Review = {
    authorName: reviewData.authorName,
    rating: reviewData.rating,
    text: reviewData.text,
    date: "Just now",
    avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?w=100&h=100&fit=crop&q=80`,
    verified: true
  };

  // If Firebase is active, write to Firestore
  if (isFirebaseActive && db) {
    const path = "reviews";
    try {
      await addDoc(collection(db, path), {
        ...newReview,
        createdAt: serverTimestamp()
      });
      return newReview;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  }

  // Local storage backup
  const reviews = await getReviews();
  const updatedReviews = [newReview, ...reviews];
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(updatedReviews));
  return newReview;
}

// Get Appointments
export async function getAppointments(): Promise<Appointment[]> {
  if (isFirebaseActive && db) {
    const path = "appointments";
    try {
      const q = query(collection(db, path), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const list: Appointment[] = [];
      querySnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        list.push({
          id: docSnap.id,
          customerName: d.customerName,
          email: d.email,
          phone: d.phone,
          serviceId: d.serviceId,
          serviceName: d.serviceName,
          date: d.date,
          time: d.time,
          notes: d.notes || "",
          createdAt: d.createdAt,
          status: d.status || "pending"
        });
      });
      return list;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  }

  // Local Storage Fallback
  const stored = localStorage.getItem(APPOINTMENTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

// Add Appointment
export async function addAppointment(apt: Omit<Appointment, "id">): Promise<Appointment> {
  const appointment: Appointment = {
    ...apt,
    status: "pending"
  };

  if (isFirebaseActive && db) {
    const path = "appointments";
    try {
      const docRef = await addDoc(collection(db, path), {
        ...appointment,
        createdAt: new Date().toISOString() // ISO string for safety
      });
      return { ...appointment, id: docRef.id };
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  }

  // Local storage mode
  const current = await getAppointments();
  const newApt = { ...appointment, id: "apt_" + Date.now() };
  const updated = [newApt, ...current];
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
  return newApt;
}

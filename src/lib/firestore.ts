import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// ---------- Contact Requests ----------

export async function createContactRequest(data: {
  name: string;
  email: string;
  phone: string | null;
  requested_date: string;
  start_time: string;
  end_time: string;
  purpose: string | null;
  is_flexible: boolean;
  agreed_to_terms: boolean;
  gdpr_consent: boolean;
}) {
  return addDoc(collection(db, "contact_requests"), {
    ...data,
    status: "pending",
    created_at: serverTimestamp(),
  });
}

export async function fetchContactRequests() {
  const q = query(
    collection(db, "contact_requests"),
    orderBy("created_at", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateContactRequestStatus(
  id: string,
  status: "approved" | "declined"
) {
  return updateDoc(doc(db, "contact_requests", id), { status });
}

// ---------- Contact Requests by User Email ----------

export async function fetchUserContactRequests(email: string) {
  const q = query(
    collection(db, "contact_requests"),
    where("email", "==", email),
    orderBy("created_at", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ---------- Bookings ----------

export async function createBooking(data: {
  contact_request_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  purpose: string | null;
}) {
  return addDoc(collection(db, "bookings"), {
    ...data,
    created_at: serverTimestamp(),
  });
}

export async function fetchAllBookings() {
  const q = query(
    collection(db, "bookings"),
    orderBy("created_at", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function fetchUserBookings(email: string) {
  const q = query(
    collection(db, "bookings"),
    where("client_email", "==", email),
    orderBy("created_at", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ---------- Booked Dates (for calendar blocking) ----------

export async function fetchBookedDates(): Promise<string[]> {
  const snapshot = await getDocs(collection(db, "bookings"));
  const dates = new Set<string>();
  snapshot.docs.forEach((d) => {
    const data = d.data();
    if (data.booking_date) dates.add(data.booking_date);
  });
  return Array.from(dates);
}

// ---------- Checklist Submissions ----------

export async function createChecklistSubmission(data: {
  booking_reference: string | null;
  submitted_by_name: string;
  submitted_by_email: string;
  submission_date: string;
  responses: Record<string, Record<string, boolean>>;
  comments: string | null;
}) {
  return addDoc(collection(db, "checklist_submissions"), {
    ...data,
    created_at: serverTimestamp(),
  });
}

// ---------- Pricing Rules ----------

export async function fetchActivePricingRule() {
  const q = query(
    collection(db, "pricing_rules"),
    where("is_active", "==", true),
    orderBy("effective_from", "desc"),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

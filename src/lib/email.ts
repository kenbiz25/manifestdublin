import emailjs from "@emailjs/browser";

// EmailJS configuration — set these in your .env file
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const USER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID || "";
const ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID || "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

interface BookingEmailData {
  client_name: string;
  client_email: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  purpose: string | null;
}

/**
 * Send booking confirmation email to the user.
 */
export async function sendBookingConfirmationToUser(data: BookingEmailData) {
  if (!SERVICE_ID || !USER_TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS not configured — skipping user confirmation email");
    return;
  }

  return emailjs.send(
    SERVICE_ID,
    USER_TEMPLATE_ID,
    {
      to_name: data.client_name,
      to_email: data.client_email,
      booking_date: data.booking_date,
      start_time: data.start_time,
      end_time: data.end_time,
      purpose: data.purpose || "Not specified",
    },
    PUBLIC_KEY
  );
}

/**
 * Send new booking notification email to the admin.
 */
export async function sendBookingNotificationToAdmin(data: BookingEmailData) {
  if (!SERVICE_ID || !ADMIN_TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS not configured — skipping admin notification email");
    return;
  }

  return emailjs.send(
    SERVICE_ID,
    ADMIN_TEMPLATE_ID,
    {
      admin_email: "kenbiz25@gmail.com",
      client_name: data.client_name,
      client_email: data.client_email,
      booking_date: data.booking_date,
      start_time: data.start_time,
      end_time: data.end_time,
      purpose: data.purpose || "Not specified",
    },
    PUBLIC_KEY
  );
}

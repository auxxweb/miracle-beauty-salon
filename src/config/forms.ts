export const GOOGLE_SHEETS_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbzqwjiUfo2Tl8h4B37d5cMzuIiTkQT_qoiLE8d8MGdn924RnKl0ioiPTn0yJKhBAoOeVw/exec'

/** GET endpoint — same web app URL (returns services JSON from doGet). */
export const GOOGLE_SHEETS_SERVICES_API_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_SERVICES_URL ?? GOOGLE_SHEETS_WEB_APP_URL

export const CONTACT_SERVICE_OPTIONS = [
  'Bridal Makeup & Wedding Packages',
  'Groom Packages',
  'Haircut & Hairstyling',
  'Hair Coloring & Hair Spa',
  'Facial & Cleanup Services',
  'Nail Care Services',
  'Guest Makeup & Event Styling',
  'First Communion Packages',
  'General Inquiry',
] as const

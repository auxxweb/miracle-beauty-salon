export const GOOGLE_SHEETS_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbyAP0Va1677MqWrlOUNv02Som9X05hzPsM2IyMWilw550S399T2wRx9L6MpEpUrHY3zKA/exec'

/** GET — services menu (`?sheet=Services`). */
export const GOOGLE_SHEETS_SERVICES_API_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_SERVICES_URL ??
  `${GOOGLE_SHEETS_WEB_APP_URL}?sheet=Services`

/** GET — salon offers (`?sheet=Offers`). */
export const GOOGLE_SHEETS_OFFERS_API_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_OFFERS_URL ??
  `${GOOGLE_SHEETS_WEB_APP_URL}?sheet=Offers`

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

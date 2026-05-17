export type ContactFormValues = {
  fullName: string
  phone: string
  email: string
  service: string
  preferredDate: string
  message: string
  sourcePage: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^(\+91[\s-]?)?[6-9]\d{9}$/

export function normalizePhone(value: string): string {
  return value.replace(/[\s-]/g, '')
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required'
  }

  const phone = normalizePhone(values.phone)
  if (!phone) {
    errors.phone = 'Phone number is required'
  } else if (!PHONE_RE.test(phone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Enter a valid email address'
  }

  if (!values.service) {
    errors.service = 'Please select a service'
  }

  if (!values.preferredDate) {
    errors.preferredDate = 'Preferred date is required'
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required'
  }

  return errors
}

export function hasContactFormErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0
}

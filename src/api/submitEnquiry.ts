import { GOOGLE_SHEETS_WEB_APP_URL } from '@/config/forms'
import type { ContactFormValues } from '@/lib/validation/contactForm'
import { normalizePhone } from '@/lib/validation/contactForm'

const SOURCE_PAGE_LABELS: Record<string, string> = {
  '/': 'Homepage',
  '/contact': 'Contact',
  '/services': 'Services',
  '/about': 'About',
  '/gallery': 'Gallery',
}

function formatSourcePage(pathname: string): string {
  if (!pathname) return 'Website'
  return SOURCE_PAGE_LABELS[pathname] ?? pathname
}

export function buildEnquiryFormData(values: ContactFormValues): FormData {
  const formData = new FormData()
  formData.append('fullName', values.fullName.trim())
  formData.append('phone', normalizePhone(values.phone))
  formData.append('email', values.email.trim())
  formData.append('service', values.service)
  formData.append('preferredDate', values.preferredDate)
  formData.append('message', values.message.trim())
  formData.append('sourcePage', formatSourcePage(values.sourcePage))
  return formData
}

function parseGoogleScriptResponse(text: string): { success?: boolean; message?: string } | null {
  const trimmed = text.trim()
  if (!trimmed) return null

  try {
    return JSON.parse(trimmed) as { success?: boolean; message?: string }
  } catch {
    const jsonMatch = trimmed.match(/\{[\s\S]*"success"[\s\S]*\}/)
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]) as { success?: boolean; message?: string }
      } catch {
        return null
      }
    }
    return null
  }
}

/**
 * POST enquiry to Google Apps Script via FormData (no JSON headers → no OPTIONS preflight).
 */
export async function submitEnquiryToGoogleSheets(values: ContactFormValues): Promise<void> {
  const formData = buildEnquiryFormData(values)

  let response: Response
  try {
    response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      body: formData,
    })
  } catch {
    throw new Error('Unable to send your message. Please check your connection and try again.')
  }

  const text = await response.text()
  const parsed = parseGoogleScriptResponse(text)

  if (parsed?.success === false) {
    throw new Error(parsed.message || 'Submission failed. Please try again.')
  }

  if (parsed?.success === true) {
    return
  }

  if (response.ok || text.toLowerCase().includes('success')) {
    return
  }

  throw new Error('Unable to send your message. Please call us or try again shortly.')
}

/** @deprecated Use submitEnquiryToGoogleSheets — kept for existing imports */
export const submitContactToSheet = submitEnquiryToGoogleSheets

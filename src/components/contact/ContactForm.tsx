import { useState } from 'react'
import { motion } from '@/lib/motion'
import { useLocation } from 'react-router-dom'
import { submitEnquiryToGoogleSheets } from '@/api/submitEnquiry'
import { CONTACT_SERVICE_OPTIONS } from '@/config/forms'
import { Input } from '@/components/ui/Input'
import { DateInput } from '@/components/ui/DateInput'
import { TextArea } from '@/components/ui/TextArea'
import { Select } from '@/components/ui/Select'
import { FormSubmitButton } from '@/components/ui/FormSubmitButton'
import { useToast } from '@/components/ui/Toast'
import {
  validateContactForm,
  hasContactFormErrors,
  type ContactFormValues,
  type ContactFormErrors,
} from '@/lib/validation/contactForm'

function todayLocalDateString(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const initialValues: ContactFormValues = {
  fullName: '',
  phone: '',
  email: '',
  service: '',
  preferredDate: '',
  message: '',
  sourcePage: '',
}

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: 'easeOut' as const },
  }),
}

export function ContactForm() {
  const { pathname } = useLocation()
  const { showSuccess, showError } = useToast()
  const [values, setValues] = useState<ContactFormValues>({
    ...initialValues,
    sourcePage: pathname,
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessState, setShowSuccessState] = useState(false)

  function updateField<K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const payload: ContactFormValues = {
      ...values,
      sourcePage: pathname || values.sourcePage || '/contact',
    }
    const validationErrors = validateContactForm(payload)
    if (hasContactFormErrors(validationErrors)) {
      setErrors(validationErrors)
      showError('Please fix the highlighted fields and try again.')
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      await submitEnquiryToGoogleSheets(payload)
      setShowSuccessState(true)
      showSuccess('Thank you! We will contact you shortly.')
      setValues({ ...initialValues, sourcePage: pathname })
      window.setTimeout(() => setShowSuccessState(false), 4000)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or call us directly.'
      showError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-visible rounded-2xl border border-gold-subtle/80 bg-white/[0.03] p-6 shadow-soft backdrop-blur-xl md:p-10"
    >
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative space-y-6"
      >
        <motion.div custom={0} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-xs tracking-[0.35em] uppercase text-gold-light mb-2">Book with us</p>
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-1">Send a message</h2>
          <p className="text-muted text-sm font-light">
            Share your details and we will get back to you soon.
          </p>
        </motion.div>

        <AnimatePresenceSuccess show={showSuccessState} />

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <input type="hidden" name="sourcePage" value={pathname} readOnly />

          <motion.div custom={1} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Input
              name="fullName"
              label="Full Name"
              value={values.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              error={errors.fullName}
              placeholder="Your full name"
              autoComplete="name"
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.div custom={2} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-5">
            <Input
              name="phone"
              label="Phone Number"
              type="tel"
              value={values.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              error={errors.phone}
              placeholder="+91 98765 43210"
              autoComplete="tel"
              disabled={isSubmitting}
            />
            <Input
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={(e) => updateField('email', e.target.value)}
              error={errors.email}
              placeholder="you@email.com"
              autoComplete="email"
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.div custom={3} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-5">
            <Select
              name="service"
              label="Service Interested"
              options={CONTACT_SERVICE_OPTIONS}
              value={values.service}
              onChange={(e) => updateField('service', e.target.value)}
              error={errors.service}
              disabled={isSubmitting}
            />
            <DateInput
              name="preferredDate"
              label="Preferred Date"
              value={values.preferredDate}
              onChange={(e) => updateField('preferredDate', e.target.value)}
              error={errors.preferredDate}
              min={todayLocalDateString()}
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.div custom={4} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <TextArea
              name="message"
              label="Message"
              value={values.message}
              onChange={(e) => updateField('message', e.target.value)}
              error={errors.message}
              placeholder="Tell us about your appointment or questions…"
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.div custom={5} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <FormSubmitButton isLoading={isSubmitting}>Submit enquiry</FormSubmitButton>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  )
}

function AnimatePresenceSuccess({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <motion.p
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold-pale"
      role="status"
    >
      Thank you! We will contact you shortly.
    </motion.p>
  )
}

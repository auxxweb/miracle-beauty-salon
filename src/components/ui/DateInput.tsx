import { forwardRef, useId, useRef } from 'react'
import { Calendar } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

type DateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
  error?: string
}

function openDatePicker(input: HTMLInputElement | null) {
  if (!input || input.disabled) return
  input.focus()
  if (typeof input.showPicker === 'function') {
    try {
      input.showPicker()
    } catch {
      input.click()
    }
  }
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, error, id, className = '', min, disabled, onClick, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? props.name ?? generatedId
    const innerRef = useRef<HTMLInputElement>(null)

    function setRef(node: HTMLInputElement | null) {
      innerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    }

    return (
      <div className="relative z-10 space-y-2">
        <label
          htmlFor={inputId}
          className="block text-xs tracking-[0.2em] uppercase text-gold-light/90"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={setRef}
            id={inputId}
            type="date"
            min={min}
            disabled={disabled}
            onClick={(e) => {
              openDatePicker(e.currentTarget)
              onClick?.(e)
            }}
            className={`date-input w-full min-h-12 rounded-2xl border bg-black/40 py-3 pl-4 pr-12 text-white backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60 hover:border-gold/30 disabled:cursor-not-allowed disabled:opacity-60 ${
              error ? 'border-red-500/60' : 'border-gold-subtle'
            } ${className}`}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled}
            onClick={() => openDatePicker(innerRef.current)}
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-gold-light transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none"
            aria-label="Open calendar"
          >
            <Calendar size={20} aria-hidden />
          </button>
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-400/90" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

DateInput.displayName = 'DateInput'

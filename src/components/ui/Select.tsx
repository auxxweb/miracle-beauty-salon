import { forwardRef, type SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
  options: readonly string[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, id, options, placeholder = 'Select a service', className = '', ...props },
    ref,
  ) => {
    const inputId = id ?? props.name

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-xs tracking-[0.2em] uppercase text-gold-light/90"
        >
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={`w-full min-h-12 appearance-none rounded-2xl border bg-black/40 px-4 py-3 pr-10 text-white backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60 hover:border-gold/30 ${
              error ? 'border-red-500/60' : 'border-gold-subtle'
            } ${!props.value ? 'text-white/40' : ''} ${className}`}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option} value={option} className="bg-charcoal text-white">
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold-light"
            aria-hidden
          />
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

Select.displayName = 'Select'

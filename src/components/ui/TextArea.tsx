import { forwardRef, type TextareaHTMLAttributes } from 'react'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id ?? props.name

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-xs tracking-[0.2em] uppercase text-gold-light/90"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          className={`w-full min-h-[140px] rounded-2xl border bg-black/40 px-4 py-3 text-white placeholder:text-white/30 backdrop-blur-md transition-all duration-200 resize-y focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60 hover:border-gold/30 ${
            error ? 'border-red-500/60' : 'border-gold-subtle'
          } ${className}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-400/90" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

TextArea.displayName = 'TextArea'

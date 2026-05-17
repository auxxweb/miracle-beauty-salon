import { Loader2 } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type FormSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  children: ReactNode
}

export function FormSubmitButton({
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: FormSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className={`inline-flex w-full items-center justify-center gap-2 min-h-12 rounded-2xl bg-gold-gradient px-6 py-3 text-sm font-semibold tracking-widest uppercase text-black shadow-gold transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 size={18} className="animate-spin" aria-hidden />
          Sending…
        </>
      ) : (
        children
      )}
    </button>
  )
}

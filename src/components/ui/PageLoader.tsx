export function PageLoader() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      aria-busy="true"
      aria-label="Loading page"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold-light" />
    </div>
  )
}

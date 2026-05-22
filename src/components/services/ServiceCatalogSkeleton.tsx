export function ServiceCatalogSkeleton() {
  return (
    <div className="space-y-14 animate-pulse" aria-busy="true" aria-label="Loading services">
      <div className="space-y-3">
        <div className="h-3 w-32 bg-white/10 rounded mx-auto md:mx-auto" />
        <div className="flex gap-2 overflow-hidden md:flex-wrap md:justify-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 w-24 shrink-0 bg-white/5 rounded-sm border border-gold-subtle/40" />
          ))}
        </div>
      </div>

      {Array.from({ length: 3 }).map((_, section) => (
        <div key={section} className="space-y-4">
          <div className="flex justify-between border-b border-gold-subtle/40 pb-4">
            <div className="h-7 w-48 bg-white/10 rounded" />
            <div className="h-4 w-20 bg-white/5 rounded" />
          </div>
          <div className="hidden md:block border border-gold-subtle/40 rounded-sm overflow-hidden">
            {Array.from({ length: 5 }).map((_, row) => (
              <div
                key={row}
                className="flex gap-4 px-4 py-3 border-t border-gold-subtle/30 first:border-t-0"
              >
                <div className="h-4 flex-1 bg-white/5 rounded" />
                <div className="h-4 w-1/4 bg-white/5 rounded" />
                <div className="h-4 w-20 bg-white/5 rounded" />
              </div>
            ))}
          </div>
          <ul className="md:hidden space-y-3">
            {Array.from({ length: 4 }).map((_, row) => (
              <li key={row} className="p-4 border border-gold-subtle/40 rounded-sm bg-surface/30">
                <div className="h-4 w-3/4 bg-white/10 rounded mb-3" />
                <div className="h-3 w-1/2 bg-white/5 rounded mb-4" />
                <div className="flex justify-between">
                  <div className="h-3 w-16 bg-white/5 rounded" />
                  <div className="h-4 w-24 bg-white/10 rounded" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

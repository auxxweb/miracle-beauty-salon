type Props = {
  name: string
  role: string
  bio: string
  image?: string
}

export function TeamCard({ name, role, bio, image }: Props) {
  return (
    <article className="overflow-hidden border border-gold-subtle bg-surface rounded-sm">
      {image ? (
        <div className="aspect-[4/3] overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
        </div>
      ) : (
        <div className="w-24 h-24 mx-auto mt-8 rounded-full bg-gold-gradient/20 border border-gold-subtle flex items-center justify-center">
          <span className="font-display text-3xl text-gold-gradient">{name.charAt(0)}</span>
        </div>
      )}
      <div className="p-8 text-center">
        <h3 className="font-serif text-xl text-white mb-1">{name}</h3>
        <p className="text-xs tracking-[0.25em] uppercase text-gold-light mb-4">{role}</p>
        <p className="text-muted text-sm leading-relaxed">{bio}</p>
      </div>
    </article>
  )
}

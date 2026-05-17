# Cursor AI Master Prompt — Miracle Beauty Salon Website

> **How to use:** Open this folder in Cursor. Attach **all** reference images (logo, brand card, mood board, salon photos) to your first Agent message. Paste the **Execution Prompt** section below as your message. Replace `[BRAND DATA]` placeholders only if they are not visible in your uploaded images.

---

## Execution Prompt (copy from here ↓)

```
You are a senior frontend engineer and luxury beauty-brand UI designer. Build a complete, production-ready, multi-page website for **Miracle Beauty Salon** in this empty workspace.

### Mandatory first step — brand extraction
Before writing code, analyze EVERY image I attached in this chat (logo, brand reference, typography samples, color swatches, salon interior photos). Extract and document:

1. **Logo** — shapes, iconography, wordmark vs symbol, clear-space rules, light/dark variants
2. **Color palette** — exact hex (or closest match) for: primary, secondary, accent, background, surface, text primary, text muted, border, CTA, hover states
3. **Typography** — heading font, body font, accent/script font (if any), weights, letter-spacing feel (tight editorial vs airy luxury)
4. **Visual mood** — minimalist vs ornate, warm vs cool, matte vs glossy, photography style
5. **Business copy** — salon name spelling, tagline, phone, email, address, hours, social handles, service list, pricing if visible

Implement the site so colors, fonts, spacing rhythm, and photography treatment **match the attached brand reference 1:1**. Do not substitute a generic “salon pink” or stock palette if the reference specifies otherwise.

If any business detail is missing from images, use the `[BRAND DATA]` block at the end of this prompt and mark TODOs in a single `src/data/site.ts` file.

---

### Tech stack (non-negotiable)

| Requirement | Choice |
|-------------|--------|
| Framework | React 18+ with TypeScript |
| Build | Vite (latest stable) |
| Routing | React Router v6 — **multi-page** (separate routes, not one long landing only) |
| Styling | Tailwind CSS v4 or v3 + CSS variables for design tokens |
| Animation | Framer Motion + CSS for parallax; respect `prefers-reduced-motion` |
| Icons | Lucide React (stroke weight matches minimal luxury) |
| Images | Use files from `/public/assets/` — I will provide images; wire correct paths and `alt` text |
| SEO | Per-route `<title>`, meta description, Open Graph tags, semantic HTML5 |
| Performance | Lazy-loaded routes & below-fold images, WebP where possible, Lighthouse-minded |

Initialize the project from scratch in this directory. No Create React App. No Next.js unless I explicitly ask later.

---

### Design direction — minimalist + premium (future-proof ~5 years)

Study and apply patterns from top-tier salon/spa sites (2025–2026 luxury beauty UI):

- **Calm luxury palette** — creamy neutrals, oat, muted blush, sage, warm cocoa; metallic accent (gold/bronze/champagne) **only if** brand reference supports it
- **Generous whitespace** — editorial margins; content breathes; never cramped
- **Restrained typography** — one distinctive display face + one highly readable body; avoid more than 2 font families
- **Photography-first** — hero and section imagery carry emotion; UI chrome stays quiet
- **Subtle depth** — soft shadows, 1px hairline borders, glass/blur only sparingly on sticky header
- **No dated effects** — no heavy gradients, no skeuomorphism, no carousel overload, no autoplay sound, no parallax that causes jank on mobile

**Anti-patterns (do not use):** cluttered sidebars, tiny tap targets, stock “beauty salon” clipart, rainbow service icons, aggressive popups, infinite marquees, generic Bootstrap look.

---

### Hero — salon-industry parallax (signature moment)

Create a **full-viewport hero** on the Home page that feels bespoke to beauty/wellness:

- Layered depth: background image (salon atmosphere) at slowest scroll rate
- Mid-layer: soft gradient or brand color wash (matches reference)
- Foreground: headline, subcopy, primary CTA — moves at normal scroll or subtle fade-in
- Optional: delicate floating elements (e.g. soft bokeh, thin botanical line art) at very low opacity — only if on-brand
- **Desktop:** smooth parallax via `transform` + `will-change` or Framer Motion `useScroll` + `useTransform` (GPU-friendly)
- **Mobile:** disable heavy parallax; use static hero + elegant entrance animation (fade/slide up) to protect performance and avoid iOS scroll bugs
- Hero CTA: **Book Appointment** (primary) + secondary link (View Services)
- Include trust micro-line under CTA if data exists (e.g. “Walk-ins welcome” / “19+ years” / “All textures”)

---

### Site architecture — multi-page routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Hero parallax, featured services, brand story teaser, gallery strip, testimonials, CTA band, hours snippet |
| `/services` | Services | Categorized treatments with duration/price range if known; each card links to detail or booking |
| `/about` | About | Story, values, team/stylists grid (placeholder cards if no photos yet) |
| `/gallery` | Gallery | Masonry or balanced grid; lightbox; lazy load |
| `/contact` | Contact | Address, map embed placeholder, hours, phone click-to-call, email, contact form (client-side validation; no backend — `mailto:` or clear “connect API later” comment) |
| `/book` | Book | Booking UX: prominent CTAs to external booking URL **or** polished multi-step UI mock (service → date/time → details) ready for Calendly/Acuity/Fresha/Vagaro integration |

**Global layout:** sticky header (transparent → solid on scroll), mobile hamburger with full-screen or slide panel menu, footer with nav + social + legal.

---

### Components to build (reusable, accessible)

- `Header` / `MobileNav` — keyboard navigable, focus trap in mobile menu, `aria-expanded`
- `Footer`
- `Button` — primary / secondary / ghost variants using brand tokens
- `Section` — consistent vertical rhythm (`py-16` md:`py-24` etc.)
- `ServiceCard`, `TestimonialCard`, `TeamCard`, `GalleryImage`
- `BookingCTA` — repeated conversion block
- `PageTransition` — subtle route fade (optional, lightweight)

**Accessibility:** WCAG 2.1 AA contrast on text/CTAs, visible focus rings, `alt` on all images, logical heading order (one `h1` per page).

---

### Responsive rules — 100% mobile-first

Breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.

- Mobile-first CSS; test layouts at 320px width minimum
- Touch targets ≥ 44×44px
- Sticky mobile **Book** bar optional (thin, non-intrusive)
- Typography scales fluidly (`clamp()` for hero headline)
- Images: `srcset` / responsive sizes; no horizontal overflow (`overflow-x-hidden` on `body` if needed)
- Hamburger menu must not obscure CTA; booking always ≤2 taps from any page

---

### Assets — use my uploaded images

Place user-provided images under:

```
public/assets/
  logo/
  hero/
  gallery/
  team/
  brand/
```

Reference them in code (example paths — rename to match actual filenames after upload):

- Logo: `/assets/logo/logo-primary.svg` or `.png`
- Hero: `/assets/hero/hero-main.webp`
- Gallery: `/assets/gallery/*.webp`

Until files exist, use tasteful placeholders with correct aspect ratios and swap paths in one config file (`src/data/assets.ts`).

---

### Design tokens (implement in `src/styles/tokens.css` or Tailwind theme)

After analyzing brand images, define CSS variables:

```css
:root {
  --color-primary: /* from logo/reference */;
  --color-accent: /* from reference */;
  --color-bg: /* from reference */;
  --color-surface: /* from reference */;
  --color-text: /* from reference */;
  --color-text-muted: /* from reference */;
  --font-display: /* Google Font or local */;
  --font-body: /* Google Font or local */;
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.25rem;
  --shadow-soft: 0 4px 24px rgb(0 0 0 / 0.06);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

Map tokens to Tailwind `theme.extend` so the entire site stays consistent.

**Font loading:** use `@fontsource` or Google Fonts with `display=swap` and preconnect.

---

### Content & conversion (premium salon UX)

- Above-the-fold: value proposition + **Book** within first screen on mobile
- Service pages: clear categories (Hair, Color, Nails, Skin, Bridal, etc. — use actual list from brand data)
- Social proof: 3–6 testimonials (placeholder copy ok, realistic tone)
- Trust: hours, location, phone visible in header or footer
- Micro-interactions: button hover, card lift `translateY(-2px)`, image zoom on gallery hover — all subtle
- Page load: skeleton or fade-in for images; no layout shift (reserve image dimensions)

---

### File structure (expected)

```
miracle-beauty-salon/
  public/assets/...
  src/
    components/
    layouts/MainLayout.tsx
    pages/ Home, Services, About, Gallery, Contact, Book
    data/site.ts
    data/assets.ts
    hooks/useParallax.ts
    styles/
    App.tsx
    main.tsx
  index.html
  package.json
  tailwind.config.*
  vite.config.ts
  README.md  (short: install, dev, build, where to drop images)
```

---

### Deliverables checklist

1. Working `npm install` && `npm run dev` && `npm run build` with zero TypeScript errors
2. All 6 routes implemented and linked in nav
3. Brand-matched theme from attached images
4. Hero parallax on desktop, graceful fallback on mobile
5. Fully responsive 320px → 1920px+
6. README with asset upload instructions
7. No secrets or API keys committed

---

### Quality bar

The site should feel like a **boutique salon brand**, not a template. When comparing to reference images, a stakeholder should say colors, logo treatment, and mood are **exactly** aligned. Aim for a site that still feels modern in 2030: timeless typography, restrained motion, strong photography.

Implement everything in one cohesive pass. Show me the extracted brand token table (colors + fonts) in your first reply before or as you scaffold, then build the full site.

[BRAND DATA — fill if not in images]
- Legal name: Miracle Beauty Salon
- Tagline: [e.g. Where beauty meets care]
- Phone: [ ]
- Email: [ ]
- Address: [ ]
- Hours: [ ]
- Instagram / Facebook: [ ]
- Booking URL: [ ]
- Services: [ list with optional price ranges ]
- Specialties: [ e.g. all textures, bridal, extensions ]
```

---

## Follow-up prompts (use after first build)

### Refine brand match
```
Re-read the attached logo/brand image. Adjust --color-* and font families until the header, buttons, and hero gradient are pixel-faithful to the reference. List every token you changed.
```

### Add real images
```
I added files under public/assets/. Update src/data/assets.ts and replace all placeholders. Optimize alt text for SEO.
```

### Booking integration
```
Wire /book to open [BOOKING_URL] in a new tab from the primary CTA, and embed [Calendly|Fresha|Vagaro] inline on the Book page with responsive height.
```

### Performance pass
```
Run production build, lazy-load gallery images, add width/height to prevent CLS, and ensure Lighthouse mobile performance ≥ 90.
```

---

## Brand extraction worksheet (fill from your uploaded image)

Use this when preparing attachments so Cursor has structured data even if OCR misses details:

| Token | Value from your brand image |
|-------|----------------------------|
| Primary color (hex) | |
| Secondary color (hex) | |
| Accent / metallic (hex) | |
| Background (hex) | |
| Body text (hex) | |
| Display font | |
| Body font | |
| Logo file name | |
| Tagline | |
| Phone | |
| Address | |
| Hours | |
| Top 5 services | |

---

## Recommended image pack for Cursor

Upload these into `public/assets/` **before or with** the first prompt:

| Folder | Files |
|--------|--------|
| `logo/` | Primary logo PNG/SVG, reversed/light version |
| `hero/` | 1–2 wide salon shots (2400×1600+), WebP preferred |
| `gallery/` | 8–16 treatment/interior photos |
| `team/` | Stylist portraits (optional) |
| `brand/` | Your reference card / menu screenshot (for color & font matching) |

---

## Premium salon UI research summary (baked into prompt)

- Mobile-first nav → lower bounce, higher booking intent  
- Calm neutrals + one accent → luxury perception  
- 3-step booking flow → higher completion  
- Real photography > stock → ~40% conversion lift on service pages  
- Clear pricing/duration on services → faster first-time booking decisions  
- Sticky **Book Now** on mobile → industry best practice  
- `prefers-reduced-motion` → accessibility and iOS comfort  

---

*Generated for Miracle Beauty Salon — React + Vite multi-page luxury salon site.*

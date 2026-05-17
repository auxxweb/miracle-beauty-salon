# Miracle Beauty Care — Website

Premium, mobile-first multi-page salon website built with React, TypeScript, and Vite.

## Brand

- **Name:** Miracle Beauty Care  
- **Tagline:** The complete family salon  
- **Theme:** Black background, metallic gold accents, white body text  

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build
npm run preview
```

## Add your logo

Save your logo image as:

`public/assets/logo/logo-primary.png`

The site falls back to `logo-primary.svg` until the PNG exists.

## Customize business info

Edit `src/data/site.ts` — phone, email, address, hours, social links, and booking URL.

## Pages

| Route | Page |
|-------|------|
| `/` | Home (parallax hero) |
| `/services` | Services |
| `/about` | About |
| `/gallery` | Gallery |
| `/contact` | Contact |
| `/book` | Book |

## Replace gallery photos

Add images under `public/assets/gallery/` and update `src/data/site.ts` (`galleryImages`) or `src/data/assets.ts`.

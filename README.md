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

## Services menu (Google Sheets)

The `/services` page loads pricing live from Google Apps Script on every visit and refresh. The last successful response is shown instantly while a fresh fetch runs in the background (stale-while-revalidate).

1. Create a sheet tab named **Services** with headers:  
   `service_name`, `avg_time`, `cost`, `cost_unit`, `category_service_name`, `category_service_type`
2. Paste `scripts/google-sheets-services.gs` into the same Apps Script project as the contact form.
3. Deploy the web app (Execute as: **Me**, Who has access: **Anyone**).
4. Optional: set `VITE_GOOGLE_SHEETS_SERVICES_URL` in `.env` (see `.env.example`).  
   By default the app uses `GOOGLE_SHEETS_WEB_APP_URL` (GET returns the services JSON).

Sheet edits appear after a page refresh or when returning to the tab. If the API is unreachable, the last saved snapshot is shown with an offline notice.

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

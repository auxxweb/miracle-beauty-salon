/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_SERVICES_URL?: string
  readonly VITE_GOOGLE_SHEETS_OFFERS_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

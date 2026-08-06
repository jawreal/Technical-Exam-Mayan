/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly DEV_API_URL: string;
  RESEND_API_KEY: string; // must always start with VITE
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
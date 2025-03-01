/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPRING_API_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_GOOGLE_CLIENT_SECRET: string;
  readonly VITE_KAKAO_REST_API_KEY: string;
  readonly VITE_PORT: string;
}


interface ImportMeta {
  readonly env: ImportMetaEnv;
}
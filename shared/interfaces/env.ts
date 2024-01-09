export interface ENV {
  DATABASE_URL: string;
  API_HOST: string;
  API_PORT: string;
  ALLOWED_ORIGINS: string;
  COOKIE_SECRET: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  SENTRY_API_DSN: string;
  MAX_SESSIONS: number;
  SESSION_EXPIRATION: number;
}

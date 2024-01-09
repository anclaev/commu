/**
 * Environment vars
 */
export interface ENV {
  /**
   * Database connection string
   */
  DATABASE_URL: string;

  /**
   * API hostname
   */
  API_HOST: string;

  /**
   * API port
   */
  API_PORT: string;

  /**
   * Allowed origins for API requests
   */
  ALLOWED_ORIGINS: string;

  /**
   * Secret for cookie
   */
  COOKIE_SECRET: string;

  /**
   * Secret for JWT tokens
   */
  JWT_SECRET: string;

  /**
   * Sentry connection string for API
   */
  SENTRY_API_DSN: string;
}

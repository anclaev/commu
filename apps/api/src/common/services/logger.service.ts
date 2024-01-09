import { ConsoleLogger, Injectable } from '@nestjs/common';

/**
 * Service for logging based on native logger
 * @constructor
 */
@Injectable()
export class LoggerService extends ConsoleLogger {
  /**
   * Logger constructor
   * @param {string} ctx Logging context
   */
  constructor(ctx?: string) {
    super(ctx || 'Comduty');
  }

  /**
   * Get context
   * @returns {string} Current context
   */
  ctx(): string {
    return this.context;
  }

  /**
   * Set context
   * @param {string} ctx New context
   */
  setCtx(ctx: string) {
    this.setContext(ctx);
  }
}

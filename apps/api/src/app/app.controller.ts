import { Controller, Get } from '@nestjs/common';

/**
 * Controller for checking server health
 */
@Controller()
export class AppController {
  /**
   * GET /
   * @returns {string} Hello response
   */
  @Get()
  hello(): string {
    return 'Hello API!';
  }
}

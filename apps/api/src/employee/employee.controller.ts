import { Controller, Get } from '@nestjs/common';

/**
 * Employee HTTP controller
 */
@Controller('employee')
export class EmployeeController {
  /**
   * Test get route
   * @returns
   */
  @Get()
  get() {
    return 'Hi';
  }
}

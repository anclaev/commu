import { Controller, Get } from '@nestjs/common';

@Controller('nsi/department')
export class DepartmentController {
  @Get()
  get() {
    return 'hi';
  }
}

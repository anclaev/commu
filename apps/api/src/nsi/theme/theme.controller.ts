import { Controller, Get } from '@nestjs/common';

@Controller('nsi/theme')
export class ThemeController {
  @Get()
  get() {
    return 'hi';
  }
}

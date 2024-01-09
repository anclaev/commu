import { Controller, Get } from '@nestjs/common';

@Controller('nsi/position')
export class PositionController {
  @Get()
  get() {
    return 'hi';
  }
}

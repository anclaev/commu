import { Controller, Get } from '@nestjs/common';

@Controller('nsi/post')
export class PostController {
  @Get()
  get() {
    return 'hi';
  }
}

import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('nsi/position')
export class PositionController {
  @Get()
  get() {
    return 'hi';
  }

  @Post()
  create() {
    return 'hi';
  }

  @Put()
  update() {
    return 'hi';
  }

  @Delete()
  remove() {
    return 'hi';
  }
}

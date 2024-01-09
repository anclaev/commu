import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('nsi/department')
export class DepartmentController {
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

import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  status() {
    return 'hi!';
  }

  @Post('sign-in')
  signIn() {
    return 'hi!';
  }

  @Post('logout')
  logout() {
    return 'hi!';
  }

  @Put('refresh')
  refresh() {
    return 'hi!';
  }
}

import { Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';

import { AuthenticatedRequest } from './interfaces/auth-request';
import { Auth, LocalAuth, RefreshAuth } from './decorators';
import { Auth as IAuth } from './interfaces/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Auth()
  @Get()
  async isAuthenticated(@Req() req: AuthenticatedRequest): Promise<IAuth> {
    return req.user;
  }

  @LocalAuth()
  @Post('sign-in')
  async signIn(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const response = await this.auth.signIn(req.user, req.fingerprint, res);

    return response.sendStatus(200);
  }

  @Auth()
  @Post('logout')
  async logout(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const response = await this.auth.logout(req.user, res);

    return response.sendStatus(200);
  }

  @RefreshAuth()
  @Put('refresh')
  async refresh(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const response = await this.auth.refresh(req.user, res);

    return response.sendStatus(200);
  }
}

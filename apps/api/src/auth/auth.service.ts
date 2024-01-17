import { Injectable } from '@nestjs/common';
import { Session } from '@prisma/client';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import moment from 'moment';

import { Fingerprint } from '@shared/interfaces/fingerprint';
import { Auth } from '@shared/interfaces/auth-credentials';
import { Cookie } from '@shared/interfaces/cookie';

import { cookieToString } from '../common/utils/cookie';

import { CreateSessionCommand } from './commands/create-session';
import { CreateCookieCommand } from './commands/create-cookie';
import { RemoveSessionCommand } from './commands/remove-session';

@Injectable()
export class AuthService {
  constructor(private readonly command: CommandBus) {}

  async signIn(
    payload: Auth,
    fingerprint: Fingerprint,
    res: Response
  ): Promise<Response> {
    const access = await this.command.execute<CreateCookieCommand, Cookie>(
      new CreateCookieCommand({
        type: 'auth',
        payload,
      })
    );

    const refresh = await this.command.execute<CreateCookieCommand, Cookie>(
      new CreateCookieCommand({
        type: 'refresh',
        payload,
      })
    );

    await this.command.execute<CreateSessionCommand, Session>(
      new CreateSessionCommand({
        expiration: moment().add(refresh.maxAge, 's').toDate(),
        fingerprint,
        payload,
        refresh: refresh[0].value,
      })
    );

    return res.setHeader('Set-Cookie', [
      cookieToString(access[0]),
      cookieToString(refresh[0]),
    ]);
  }

  async logout(payload: Auth, res: Response): Promise<Response> {
    const cookies = await this.command.execute<CreateCookieCommand, Cookie[]>(
      new CreateCookieCommand({ type: 'logout' })
    );

    await this.command.execute<RemoveSessionCommand>(
      new RemoveSessionCommand(payload.session)
    );

    return res.setHeader(
      'Set-Cookie',
      cookies.map((cookie) => cookieToString(cookie))
    );
  }

  async refresh(payload: Auth, res: Response): Promise<Response> {
    const access = await this.command.execute<CreateCookieCommand, Cookie>(
      new CreateCookieCommand({
        payload,
        type: 'auth',
      })
    );

    return res.setHeader('Set-Cookie', cookieToString(access[0]));
  }
}

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Session } from '@prisma/client';
import { Request } from 'express';

import { Cookie } from '@shared/interfaces/cookie';

import { ConfigService } from '../../common/services/config.service';
import { cookieToString } from '../../common/utils/cookie';

import { Auth } from 'shared/interfaces/auth-credentials';

import { GetSessionByIdQuery } from '../queries/get-session-by-id';
import { RemoveSessionCommand } from '../commands/remove-session';
import { CreateCookieCommand } from '../commands/create-cookie';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(
    private config: ConfigService,
    private query: QueryBus,
    private command: CommandBus
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: config.getValue<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: Auth) {
    const token = req.cookies.Refresh as string;

    const session = await this.query.execute<GetSessionByIdQuery, Session>(
      new GetSessionByIdQuery({ id: payload.session })
    );

    if (!session) {
      const cookie = await this.getCookieForLogout();

      req.res.setHeader('Set-Cookie', cookie);
      throw new BadRequestException('Wrong credentials provided');
    }

    if (token !== session.refresh) {
      await this.command.execute<RemoveSessionCommand>(
        new RemoveSessionCommand(payload.session)
      );

      const cookie = await this.getCookieForLogout();

      req.res.setHeader('Set-Cookie', cookie);

      throw new BadRequestException('Wrong credentials provided');
    }

    return {
      id: payload.id,
      login: payload.login,
      role: payload.role,
      session: payload.session,
    };
  }

  private async getCookieForLogout(): Promise<string[]> {
    const cookies = await this.command.execute<CreateCookieCommand, Cookie[]>(
      new CreateCookieCommand({
        type: 'logout',
      })
    );

    return cookies.map((cookie) => cookieToString(cookie));
  }
}

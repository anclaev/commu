import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { Cookie } from '@shared/interfaces/cookie';
import { Auth } from '@shared/interfaces/auth-credentials';

import { ConfigService } from '../../common/services/config.service';

type TokenType = 'auth' | 'refresh' | 'logout';

export class CreateCookieCommand {
  constructor(public readonly dto: { payload?: Auth } & { type: TokenType }) {}
}

@CommandHandler(CreateCookieCommand)
export class CreateCookieHandler
  implements ICommandHandler<CreateCookieCommand>
{
  constructor(private config: ConfigService, private jwt: JwtService) {}

  async execute({ dto }: CreateCookieCommand): Promise<Cookie[]> {
    const isProduction = process.env.NODE_ENV !== 'development';
    const { payload, type } = dto;

    if (type === 'logout') {
      return [
        {
          key: 'Authentication',
          value: '',
          httpOnly: true,
          secure: isProduction,
          path: '/',
          maxAge: 0,
        },
        {
          key: 'Refresh',
          value: '',
          httpOnly: true,
          secure: isProduction,
          path: '/auth/refresh',
          maxAge: 0,
        },
      ];
    }

    const expiration = this.config.getValue<number>(
      type === 'auth' ? 'JWT_EXPIRATION' : 'JWT_REFRESH_EXPIRATION'
    );

    const secret = this.config.getValue<string>(
      type === 'auth' ? 'JWT_SECRET' : 'JWT_REFRESH_SECRET'
    );

    const token = await this.jwt.signAsync(payload, {
      secret,
      expiresIn: `${expiration}s`,
    });

    return [
      {
        key: type === 'auth' ? 'Authentication' : 'Refresh',
        value: token,
        httpOnly: true,
        secure: isProduction,
        maxAge: Number(expiration),
        path: type === 'auth' ? '/' : '/auth/refresh',
      },
    ];
  }
}

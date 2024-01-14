import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Employee } from '@prisma/client';
import { Request } from 'express';

import { Auth } from '../interfaces/auth';

import { ConfigService } from '../../common/services/config.service';

import { GetEmployeeQuery } from '../../employee/queries/get-employee';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private config: ConfigService, private readonly query: QueryBus) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.getValue('JWT_SECRET'),
    });
  }

  async validate({ id, session }: Auth): Promise<Auth> {
    const { login, role } = await this.query.execute<
      GetEmployeeQuery,
      Employee
    >(
      new GetEmployeeQuery({
        id,
      })
    );

    return {
      id,
      role,
      login,
      session,
    };
  }
}

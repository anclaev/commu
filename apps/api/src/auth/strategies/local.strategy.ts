import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { Employee } from '@prisma/client';
import { CommandBus } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { UUID } from 'crypto';

import { SignInCommand } from '../commands/sign-in';

import { Auth } from 'shared/interfaces/auth-credentials';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private command: CommandBus) {
    super({
      usernameField: 'login',
    });
  }

  async validate(login: string, password: string): Promise<Auth> {
    const { id, role } = await this.command.execute<SignInCommand, Employee>(
      new SignInCommand({
        login,
        password,
      })
    );

    return {
      id: id as UUID,
      login,
      role,
      session: uuid() as UUID,
    };
  }
}

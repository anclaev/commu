import { Module } from '@nestjs/common';

import { SessionRepository } from './session.repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCommands } from './commands';
import { AuthQueries } from './queries';

@Module({
  controllers: [AuthController],
  providers: [...AuthQueries, ...AuthCommands, SessionRepository, AuthService],
})
export class AuthModule {}

import { ConfigService } from '../common/services/config.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { SessionRepository } from './session.repository';

import { AuthCommandHandlers, AuthCommands } from './commands';
import { AuthQueries, AuthQueryHandlers } from './queries';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategies } from './strategies';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.getValue<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.getValue<number>('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...AuthCommands,
    ...AuthQueries,
    ...AuthCommandHandlers,
    ...AuthQueryHandlers,
    ...AuthStrategies,
    SessionRepository,
    AuthService,
  ],
})
export class AuthModule {}

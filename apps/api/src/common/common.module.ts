import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { ConfigService } from './services/config.service';
import { LoggerService } from './services/logger.service';

@Global()
@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ConfigService, LoggerService],
  exports: [ConfigService, LoggerService],
})
export class CommonModule {}

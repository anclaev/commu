import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { ConfigService } from './services/config.service';
import { LoggerService } from './services/logger.service';
import { PrismaModule } from 'nestjs-prisma';

@Global()
@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: async (config: ConfigService) => {
        return {
          prismaOptions: {
            datasources: {
              db: {
                url: config.getValue<string>('DATABASE_URL'),
              },
            },
          },
          explicitConnect: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [ConfigService, LoggerService],
  exports: [ConfigService, LoggerService],
})
export class CommonModule {}

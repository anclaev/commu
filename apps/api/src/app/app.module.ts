import { RavenInterceptor, RavenModule } from 'nest-raven';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpException, Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { AppController } from './app.controller';

@Module({
  imports: [CommonModule, RavenModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor({
        filters: [
          {
            type: HttpException,
            filter: (ex: HttpException) => 500 >= ex.getStatus(),
          },
        ],
      }),
    },
  ],
})
export class AppModule {}

import { RavenInterceptor, RavenModule } from 'nest-raven';
import { HttpException, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';

import { EmployeeModule } from '../employee/employee.module';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';
import { NsiModule } from '../nsi/nsi.module';
import { StoreModule } from '@ngrx/store';

@Module({
  imports: [CommonModule, RavenModule, NsiModule, EmployeeModule, AuthModule],
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

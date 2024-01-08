import { NestFactory } from '@nestjs/core';

import * as cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';

import { ConfigService } from './common/services/config.service';
import { LoggerService } from './common/services/logger.service';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.getHttpAdapter();

  const config = app.get(ConfigService);
  const logger = app.get(LoggerService);

  const port = process.env.PORT || 3001;
  const host = process.env.API_HOST || 'http://localhost';

  await app.listen(port);

  logger.log(`🚀 Application is running on: ${host}:${port}`);
};

bootstrap();

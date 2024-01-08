import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import fingerprint from 'express-fingerprint';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { ConfigService } from './common/services/config.service';
import { LoggerService } from './common/services/logger.service';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.getHttpAdapter();
  const expressInstance = httpAdapter.getInstance();

  const config = app.get(ConfigService);
  const logger = app.get(LoggerService);

  const allowedOrigins = config.getValue<string>('ALLOWED_ORIGINS');
  const cookieSecret = config.getValue<string>('COOKIE_SECRET');

  const port = process.env.API_PORT || 3001;
  const host = process.env.API_HOST || 'localhost';

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  app.enableCors({
    origin: allowedOrigins,
    allowedHeaders: '*',
    methods: '*',
    credentials: true,
  });

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.use(cookieParser(cookieSecret));

  expressInstance.use(fingerprint());

  await app.listen(port).finally(() => {
    logger.log(`🚀 Application is running on ${host}:${port}!`);
  });
};

bootstrap();

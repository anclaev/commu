import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { ValidationPipe } from '@nestjs/common';
import fingerprint from 'express-fingerprint';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import * as Sentry from '@sentry/node';

import { AppModule } from './app/app.module';

import { ConfigService } from './common/services/config.service';
import { LoggerService } from './common/services/logger.service';
import { RemovePayloadInterceptor } from './common/interceptors/remove-payload';

/**
 * @ignore
 */
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.getHttpAdapter();
  const instance = httpAdapter.getInstance();

  const config = app.get(ConfigService);
  const logger = app.get(LoggerService);
  const prisma = app.get(PrismaService);

  const allowedOrigins = config.getValue<string>('ALLOWED_ORIGINS');
  const cookieSecret = config.getValue<string>('COOKIE_SECRET');
  const dsn = config.getValue<string>('SENTRY_API_DSN');

  const port = process.env.API_PORT || 3001;
  const host = process.env.API_HOST || 'localhost';
  const isDev = process.env.NODE_ENV === 'development';

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  app.useGlobalInterceptors(new RemovePayloadInterceptor());

  app.enableCors({
    origin: allowedOrigins,
    allowedHeaders: '*',
    methods: '*',
    credentials: true,
  });

  Sentry.init({
    dsn,
    enabled: !isDev,
    environment: process.env.NODE_ENV || 'development',
    serverName: host,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app: instance }),
      new Sentry.Integrations.Prisma({ client: prisma }),
      new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    profilesSampleRate: 1.0,
  });

  instance.use(Sentry.Handlers.requestHandler());
  instance.use(Sentry.Handlers.tracingHandler());
  instance.use(Sentry.Handlers.errorHandler());

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.use(cookieParser(cookieSecret));

  instance.use(fingerprint());

  await app.listen(port).finally(() => {
    logger.log(`🚀 Application is running on ${host}:${port}!`);
  });
};

bootstrap();

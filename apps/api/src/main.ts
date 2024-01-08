import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app/app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3001;
  const host = process.env.API_HOST || 'http://localhost';

  await app.listen(port);

  Logger.log(`🚀 Application is running on: ${host}:${port}`, 'Comduty API');
};

bootstrap();

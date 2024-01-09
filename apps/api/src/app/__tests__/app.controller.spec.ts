import { INestApplication, ValidationPipe } from '@nestjs/common';

import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppController } from '../app.controller';

describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      })
    );

    await app.init();
  });

  describe('(GET) /', () => {
    it('should be return message', async () => {
      return request(app.getHttpServer())
        .get('')
        .expect(200)
        .expect('Hello API!');
    });
  });
});

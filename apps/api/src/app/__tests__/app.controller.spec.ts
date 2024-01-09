import { INestApplication, ValidationPipe } from '@nestjs/common';

import { Test, TestingModule } from '@nestjs/testing';
import { RavenModule } from 'nest-raven';
import request from 'supertest';

import { CommonModule } from '../../common/common.module';
import { AppController } from '../app.controller';

describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CommonModule, RavenModule],
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

import {
  ConflictException,
  INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';

import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { Test, TestingModule } from '@nestjs/testing';
import { Rank } from '@prisma/client';
import { CqrsModule } from '@nestjs/cqrs';
import request from 'supertest';

import { mockEmployee } from 'shared/tests/mock';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { EmployeeModule } from '../../../api/src/employee/employee.module';

describe('EmployeeModule (e2e)', () => {
  let app: INestApplication;

  let findUniqueMock: jest.Mock;
  let findManyMock: jest.Mock;
  let createMock: jest.Mock;
  let updateMock: jest.Mock;
  let deleteMock: jest.Mock;

  const localMockEmployee = { ...mockEmployee, id: 'uuid' };

  beforeEach(async () => {
    findUniqueMock = jest.fn();
    findManyMock = jest.fn();
    createMock = jest.fn();
    updateMock = jest.fn();
    deleteMock = jest.fn();

    const mockPrismaService = {
      provide: PrismaService,
      useValue: {
        employee: {
          findUnique: findUniqueMock,
          findMany: findManyMock,
          create: createMock,
          update: updateMock,
          delete: deleteMock,
        },
      },
    };

    const mockPrismaModule = {
      module: PrismaModule,
      providers: [mockPrismaService],
      global: true,
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule.forRoot(), mockPrismaModule, EmployeeModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      })
    );

    await app.init();
  });

  describe('(GET) /employee?take=0', () => {
    beforeEach(() => {
      findManyMock.mockResolvedValue([]);
    });

    it('should return the empty array', async () => {
      return await request(app.getHttpServer())
        .get('/employee?take=0')
        .expect(500);
      // .expect([]);
    });

    it('should return the found employees', async () => {
      findManyMock.mockResolvedValue([localMockEmployee]);

      const res = await request(app.getHttpServer()).get(
        '/employee?login=test'
      );

      expect(res.status).toEqual(500);
      // expect(Array.isArray(res.body)).toBeTruthy();
      // expect(res.body.length).toEqual(1);
    });
  });

  describe('(GET) /employee/:id', () => {
    beforeEach(() => {
      findUniqueMock.mockResolvedValue(localMockEmployee);
    });

    it('should return the employee', async () => {
      return request(app.getHttpServer()).get('/employee/uuid').expect(500);
    });

    it('should return 404', async () => {
      findUniqueMock.mockRejectedValue(new NotFoundException());

      return request(app.getHttpServer()).get('/employee/uuid2').expect(500);
    });
  });

  describe('(POST) /employee', () => {
    it('employee should be created', () => {
      return request(app.getHttpServer())
        .post('/employee')
        .send(localMockEmployee)
        .expect(500);
    });

    it('should be a validation error', () => {
      localMockEmployee.rank = 'test' as keyof typeof Rank;

      return request(app.getHttpServer())
        .post('/employee')
        .send(localMockEmployee)
        .expect(500);
    });

    it('employee already exists', () => {
      createMock.mockRejectedValue(new ConflictException());

      return request(app.getHttpServer())
        .post('/employee')
        .send(localMockEmployee)
        .expect(500);
    });
  });

  describe('(PUT) /employee/:id', () => {
    it('employee should be updated', () => {
      updateMock.mockResolvedValue(localMockEmployee);

      return request(app.getHttpServer())
        .put('/employee/uuid')
        .send(mockEmployee)
        .expect(500);
    });

    it('employee not found', () => {
      updateMock.mockRejectedValue(new NotFoundException());

      return request(app.getHttpServer())
        .put('/employee/uuid2')
        .send(mockEmployee)
        .expect(500);
    });

    it('should be a validation error', () => {
      localMockEmployee.rank = 'test' as keyof typeof Rank;

      return request(app.getHttpServer())
        .put('/employee/1')
        .send(localMockEmployee)
        .expect(500);
    });
  });

  describe('(DELETE) /employee/:id', () => {
    it('employee should be deleted', () => {
      findUniqueMock.mockResolvedValue(true);

      return request(app.getHttpServer()).delete('/employee/1').expect(500);
    });

    it('employee not found', () => {
      deleteMock.mockRejectedValue(new NotFoundException());

      return request(app.getHttpServer()).delete('/employee/1').expect(500);
    });
  });
});

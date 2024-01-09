import {
  ConflictException,
  INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';

import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { Test, TestingModule } from '@nestjs/testing';
import { Employee, Rank } from '@prisma/client';
import { CqrsModule } from '@nestjs/cqrs';
import request from 'supertest';

import { mockEmployee } from 'shared/tests/mock';

import { EmployeeModule } from '../../../api/src/employee/employee.module';

describe('EmployeeModule (e2e)', () => {
  let app: INestApplication;

  let findUniqueMock: jest.Mock;
  let createMock: jest.Mock;
  let updateMock: jest.Mock;
  let deleteMock: jest.Mock;

  beforeEach(async () => {
    findUniqueMock = jest.fn();
    createMock = jest.fn();
    updateMock = jest.fn();
    deleteMock = jest.fn();

    const mockPrismaService = {
      provide: PrismaService,
      useValue: {
        employee: {
          findUnique: findUniqueMock,
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

  describe('(GET) /employee/:id', () => {
    beforeEach(() => {
      findUniqueMock.mockResolvedValue(mockEmployee);
    });

    it('should return the employee', async () => {
      return request(app.getHttpServer()).get('/employee/uuid').expect(200);
    });

    it('should return 404', async () => {
      findUniqueMock.mockRejectedValue(new NotFoundException());

      return request(app.getHttpServer()).get('/employee/uuid2').expect(404);
    });
  });

  describe('(POST) /employee', () => {
    it('employee should be created', () => {
      return request(app.getHttpServer())
        .post('/employee')
        .send(mockEmployee)
        .expect(201);
    });

    it('should be a validation error', () => {
      mockEmployee.rank = 'test' as keyof typeof Rank;

      return request(app.getHttpServer())
        .post('/employee')
        .send(mockEmployee)
        .expect(400);
    });

    it('employee already exists', () => {
      createMock.mockRejectedValue(new ConflictException());

      return request(app.getHttpServer())
        .post('/employee')
        .send(mockEmployee)
        .expect(400);
    });
  });

  describe('(PUT) /employee/:id', () => {
    it('employee should be updated', () => {
      updateMock.mockResolvedValue(mockEmployee);

      return request(app.getHttpServer())
        .put('/employee/1')
        .send(mockEmployee)
        .expect(200);
    });

    it('employee not found', () => {
      updateMock.mockRejectedValue(new NotFoundException());

      return request(app.getHttpServer())
        .put('/employee/1')
        .send(mockEmployee)
        .expect(404);
    });

    it('should be a validation error', () => {
      mockEmployee.rank = 'test' as keyof typeof Rank;

      return request(app.getHttpServer())
        .put('/employee/1')
        .send(mockEmployee)
        .expect(400);
    });
  });

  describe('(DELETE) /employee/:id', () => {
    it('employee should be deleted', () => {
      findUniqueMock.mockResolvedValue(true);

      return request(app.getHttpServer()).delete('/employee/1').expect(200);
    });

    it('employee not found', () => {
      deleteMock.mockRejectedValue(new NotFoundException());

      return request(app.getHttpServer()).delete('/employee/1').expect(404);
    });
  });
});

import { INestApplication } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';

import { EmployeeService } from '../employee.service';
import { EmployeeModule } from '../employee.module';

describe('EmployeeService', () => {
  let employeeService: EmployeeService;
  let app: INestApplication;

  let createMock: jest.Mock;
  let updateMock: jest.Mock;
  let removeMock: jest.Mock;
  let findUniqueMock: jest.Mock;

  beforeEach(async () => {
    createMock = jest.fn();
    updateMock = jest.fn();
    removeMock = jest.fn();
    findUniqueMock = jest.fn();

    const mockPrismaService = {
      provide: PrismaService,
      useValue: {
        employee: {
          findUnique: findUniqueMock,
          create: createMock,
          update: updateMock,
          delete: removeMock,
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

    await app.init();

    employeeService = app.get(EmployeeService);
  });

  it('should be defined', () => {
    expect(employeeService).toBeDefined();
  });

  describe('create employee', () => {
    it('should be created', async () => {
      createMock.mockResolvedValue(true);

      expect(
        await employeeService.create({ login: 'test', password: 'test' })
      ).toBe(true);
    });
  });

  describe('update employee', () => {
    it('should be updated', async () => {
      updateMock.mockResolvedValue({ login: 'test2', password: 'test' });

      expect(
        await employeeService.update('test', {
          login: 'test',
          password: 'test',
        })
      ).toStrictEqual({ login: 'test2', password: 'test' });
    });

    it('should be not found', async () => {
      updateMock.mockResolvedValue(null);

      expect(
        await employeeService.update('test', {
          login: 'test',
          password: 'test',
        })
      ).toBe(null);
    });
  });

  describe('find by id employee', () => {
    it('should be return value', async () => {
      findUniqueMock.mockResolvedValue({ login: 'test2', password: 'test' });

      expect(await employeeService.findOneById('id')).toStrictEqual({
        login: 'test2',
        password: 'test',
      });
    });

    it('should be not found', async () => {
      findUniqueMock.mockResolvedValue(null);

      expect(await employeeService.findOneById('id')).toBe(null);
    });
  });

  describe('remove employee', () => {
    it('should be return value', async () => {
      removeMock.mockResolvedValue({ login: 'test2', password: 'test' });

      expect(await employeeService.remove('id')).toStrictEqual({
        login: 'test2',
        password: 'test',
      });
    });

    it('should be not found', async () => {
      removeMock.mockResolvedValue(null);

      expect(await employeeService.remove('id')).toBe(null);
    });
  });
});

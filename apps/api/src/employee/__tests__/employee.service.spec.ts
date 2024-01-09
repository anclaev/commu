import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CqrsModule } from '@nestjs/cqrs';

import { mockEmployee } from 'shared/tests/mock';

import { EmployeeCommands, EmployeeCommandHandlers } from '../commands';
import { EmployeeQueries, EmployeeQueryHandlers } from '../queries';
import { EmployeeRepository } from '../employee.repository';
import { EmployeeService } from '../employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule.forRoot()],
      providers: [
        ...EmployeeCommands,
        ...EmployeeQueries,
        ...EmployeeCommandHandlers,
        ...EmployeeQueryHandlers,
        EmployeeService,
        PrismaService,
        EmployeeRepository,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    await moduleFixture.init();

    service = moduleFixture.get(EmployeeService);
    prisma = moduleFixture.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create employee', () => {
    it('should be created', async () => {
      // @ts-ignore
      prisma.employee.create.mockResolvedValueOnce({
        ...mockEmployee,
        id: 'test',
      });

      expect(await service.create(mockEmployee)).toStrictEqual({
        ...mockEmployee,
        id: 'test',
      });
    });
  });

  describe('update employee', () => {
    it('should be updated', async () => {
      prisma.employee.update.mockResolvedValueOnce({
        ...mockEmployee,
        login: 'test2',
        id: 'test',
      });

      expect(
        await service.update('test', {
          login: 'test2',
          password: 'test',
        })
      ).toStrictEqual({ ...mockEmployee, login: 'test2', id: 'test' });
    });
  });

  describe('find by id employee', () => {
    it('should be return value', async () => {
      prisma.employee.findUnique.mockResolvedValueOnce({
        ...mockEmployee,
        id: 'test',
      });
      expect(await service.findOneById('test')).toStrictEqual({
        ...mockEmployee,
        id: 'test',
      });
    });
  });

  describe('remove employee', () => {
    it('should be return value', async () => {
      prisma.employee.delete.mockResolvedValueOnce({
        ...mockEmployee,
        id: 'test',
      });

      expect(await service.remove('test')).toStrictEqual({
        ...mockEmployee,
        id: 'test',
      });
    });
  });
});

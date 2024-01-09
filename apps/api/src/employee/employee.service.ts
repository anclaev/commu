import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Employee, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { CreateEmployeeCommand } from './commands/create-employee';
import { UpdateEmployeeCommand } from './commands/update-employee';
import { RemoveEmployeeCommand } from './commands/remove-employee';

import { GetEmployeeQuery } from './queries/get-employee';

import { GetEmployeeListQuery } from './queries/get-employee-list';
import { UpdateEmployeeDto } from './dtos/update-employee';
import { GetEmployeeListDto } from './dtos/get-employee-list';

/**
 * Employee service
 */
@Injectable()
export class EmployeeService {
  /**
   * Service constructor
   * @param {CommandBus} commandBus Command executor
   * @param {QueryBus} queryBus Query executor
   */
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  /**
   * Create method
   * @param {Prisma.EmployeeCreateInput} dto Employee data
   * @returns {Employee} Created employee
   */
  async create(dto: Prisma.EmployeeCreateInput): Promise<Employee> {
    return await this.commandBus.execute<CreateEmployeeCommand, Employee>(
      new CreateEmployeeCommand(dto)
    );
  }

  /**
   * Method for find employee by id
   * @param {string} id Employee ID
   * @returns {Employee | null} Found employee
   */
  async findOneById(id: string): Promise<Employee | null> {
    return await this.queryBus.execute<GetEmployeeQuery, Employee | null>(
      new GetEmployeeQuery({ id })
    );
  }

  /**
   * Method for update employee by id
   * @param {string} id Employee ID
   * @param {UpdateEmployeeDto} dto Updated employee fields
   * @returns {Employee | null} Updated employee
   */
  async update(id: string, dto: UpdateEmployeeDto): Promise<Employee | null> {
    return await this.commandBus.execute<
      UpdateEmployeeCommand,
      Employee | null
    >(new UpdateEmployeeCommand(id, dto));
  }

  /**
   * Method for remove employee
   * @param {string} id Employee ID
   * @returns {Employee | null} Removed employee
   */
  async remove(id: string): Promise<Employee | null> {
    return await this.commandBus.execute<
      RemoveEmployeeCommand,
      Employee | null
    >(new RemoveEmployeeCommand(id));
  }

  async getOffsetPagination(dto: GetEmployeeListDto = {}): Promise<Employee[]> {
    return await this.queryBus.execute<GetEmployeeListQuery, Employee[]>(
      new GetEmployeeListQuery({
        ...dto,
        skip: dto.skip ? Number(dto.skip) : undefined,
        take: dto.take ? Number(dto.take) : 10,
        cursor: dto.cursor ? Number(dto.cursor) : undefined,
      })
    );
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Prisma, Employee } from '@prisma/client';

import { EmployeeRepository } from '../employee.repository';

/**
 * Get employee query
 */
export class GetEmployeeQuery {
  /**
   * Constructor
   * @param {Prisma.EmployeeWhereUniqueInput} dto Employee unique fields
   */
  constructor(public readonly dto: Prisma.EmployeeWhereUniqueInput) {}
}

/**
 * Get employee query handler
 */
@QueryHandler(GetEmployeeQuery)
export class GetEmployeeHandler implements IQueryHandler<GetEmployeeQuery> {
  /**
   * Constructor
   * @param {EmployeeRepository} repository Repository for employees
   */
  constructor(private repository: EmployeeRepository) {}

  /**
   * Query executor
   * @param {GetEmployeeQuery} dto Execution query
   * @returns {Employee | null} Found employee
   */
  async execute({ dto }: GetEmployeeQuery): Promise<Employee | null> {
    return this.repository.findOne(dto);
  }
}

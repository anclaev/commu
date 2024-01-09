import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Prisma, Employee } from '@prisma/client';

import * as bcrypt from 'bcrypt';

import { EmployeeRepository } from '../employee.repository';

/**
 * Create employee commamnd
 */
export class CreateEmployeeCommand {
  /**
   * Constructor
   * @param {Prisma.EmployeeCreateInput} dto New employee data
   */
  constructor(public readonly dto: Prisma.EmployeeCreateInput) {}
}

/**
 * Create employee command handler
 */
@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeHandler
  implements ICommandHandler<CreateEmployeeCommand>
{
  /**
   * Constructor
   * @param {EmployeeRepository} repository Repository for employees
   */
  constructor(private repository: EmployeeRepository) {}

  /**
   * Command executor
   * @param {CreateEmployeeCommand} dto Execution command
   * @returns {Employee} Created employee
   */
  async execute({ dto }: CreateEmployeeCommand): Promise<Employee> {
    return await this.repository.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });
  }
}

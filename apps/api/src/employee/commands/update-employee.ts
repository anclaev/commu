import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Prisma, Employee } from '@prisma/client';

import * as bcrypt from 'bcrypt';

import { EmployeeRepository } from '../employee.repository';

/**
 * Update employee command
 */
export class UpdateEmployeeCommand {
  /**
   * Constructor
   * @param {string} id Employee ID
   * @param {Prisma.EmployeeUpdateInput} dto Employee fields for update
   */
  constructor(
    public readonly id: string,
    public readonly dto: Prisma.EmployeeUpdateInput
  ) {}
}

/**
 * Update employee command handler
 */
@CommandHandler(UpdateEmployeeCommand)
export class UpdateEmployeeHandler
  implements ICommandHandler<UpdateEmployeeCommand>
{
  /**
   * Constructor
   * @param {EmployeeRepository} repository Repository for employees
   */
  constructor(private repository: EmployeeRepository) {}

  /**
   * Command executor
   * @param {UpdateEmployeeCommand} dto Execution command
   * @returns {Employee | null} Updated employee
   */
  async execute({ id, dto }: UpdateEmployeeCommand): Promise<Employee | null> {
    return await this.repository.update(id, {
      ...dto,
      password: dto.password
        ? await bcrypt.hash(dto.password as unknown as string, 10)
        : undefined,
    });
  }
}

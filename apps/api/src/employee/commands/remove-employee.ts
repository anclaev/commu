import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Prisma, Employee } from '@prisma/client';

import { EmployeeRepository } from '../employee.repository';

/**
 * Remove employee command
 */
export class RemoveEmployeeCommand {
  /**
   * Constructor
   * @param {string} id ID of removed employee
   */
  constructor(public readonly id: string) {}
}

/**
 * Remove employee command handler
 */
@CommandHandler(RemoveEmployeeCommand)
export class RemoveEmployeeHandler
  implements ICommandHandler<RemoveEmployeeCommand>
{
  /**
   * Constructor
   * @param {EmployeeRepository} repository Repository for employees
   */
  constructor(private repository: EmployeeRepository) {}

  /**
   * Command executor
   * @param {RemoveEmployeeCommand} dto Execution command
   * @returns {Employee | null} Removed employee
   */
  async execute({ id }: RemoveEmployeeCommand): Promise<Employee | null> {
    return await this.repository.remove(id);
  }
}

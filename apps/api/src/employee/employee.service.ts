import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

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
}

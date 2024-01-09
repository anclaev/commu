import { Module } from '@nestjs/common';

import { EmployeeController } from './employee.controller';

import { EmployeeRepository } from './employee.repository';
import { EmployeeService } from './employee.service';

import { EmployeeCommands, EmployeeCommandHandlers } from './commands';
import { EmployeeQueries, EmployeeQueryHandlers } from './queries';

@Module({
  controllers: [EmployeeController],
  providers: [
    ...EmployeeCommands,
    ...EmployeeQueries,
    ...EmployeeCommandHandlers,
    ...EmployeeQueryHandlers,
    EmployeeService,
    EmployeeRepository,
  ],
})
export class EmployeeModule {}

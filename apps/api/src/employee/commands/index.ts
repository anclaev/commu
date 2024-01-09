import {
  CreateEmployeeCommand,
  CreateEmployeeHandler,
} from './create-employee';

import {
  UpdateEmployeeCommand,
  UpdateEmployeeHandler,
} from './update-employee';

import {
  RemoveEmployeeCommand,
  RemoveEmployeeHandler,
} from './remove-employee';

/**
 * @ignore
 */
export const EmployeeCommandHandlers = [
  CreateEmployeeHandler,
  UpdateEmployeeHandler,
  RemoveEmployeeHandler,
];

/**
 * @ignore
 */
export const EmployeeCommands = [
  CreateEmployeeCommand,
  UpdateEmployeeCommand,
  RemoveEmployeeCommand,
];

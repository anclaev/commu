import { GetEmployeeHandler, GetEmployeeQuery } from './get-employee';

import {
  GetEmployeeListHandler,
  GetEmployeeListQuery,
} from './get-employee-list';

/**
 * @ignore
 */
export const EmployeeQueryHandlers = [
  GetEmployeeHandler,
  GetEmployeeListHandler,
];

/**
 * @ignore
 */
export const EmployeeQueries = [GetEmployeeQuery, GetEmployeeListQuery];

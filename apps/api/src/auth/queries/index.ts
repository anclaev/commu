import {
  GetSessionByIdHandler,
  GetSessionByIdQuery,
} from './get-session-by-id';

import {
  GetSessionsByEmployeeHandler,
  GetSessionsByEmployeeQuery,
} from './get-sessions-by-employee';

/**
 * @ignore
 */
export const AuthQueries = [GetSessionsByEmployeeQuery, GetSessionByIdQuery];

/**
 * @ignore
 */
export const AuthQueryHandlers = [
  GetSessionsByEmployeeHandler,
  GetSessionByIdHandler,
];

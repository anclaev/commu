import { Request } from 'express';

import { Auth } from './auth';

export interface AuthenticatedRequest extends Request {
  user: Auth;
}

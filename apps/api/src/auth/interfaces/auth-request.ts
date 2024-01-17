import { Request } from 'express';

import { Auth } from 'shared/interfaces/auth-credentials';

export interface AuthenticatedRequest extends Request {
  user: Auth;
}

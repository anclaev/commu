import { Auth } from '../interfaces/auth';

import { Fingerprint } from 'shared/interfaces/fingerprint';

export class CreateSessionDto {
  payload: Auth;
  fingerprint: Fingerprint;
  browser?: string;
  device?: string;
  os?: string;
}

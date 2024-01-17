import { Auth } from 'shared/interfaces/auth-credentials';

import { Fingerprint } from 'shared/interfaces/fingerprint';

export class CreateSessionDto {
  refresh: string;
  expiration: Date;
  payload: Auth;
  fingerprint: Fingerprint;
  browser?: string;
  device?: string;
  os?: string;
}

import { Role } from '@prisma/client';
import { UUID } from 'crypto';

export class Auth {
  readonly id: UUID;
  readonly login: string;
  readonly role: Role;
  readonly session: UUID;
}

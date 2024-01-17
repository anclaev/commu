import { Role } from '@prisma/client';
import { UUID } from 'crypto';

export interface Auth {
  readonly id: UUID;
  readonly login: string;
  readonly role: Role;
  readonly session: UUID;
  readonly name?: string;
}

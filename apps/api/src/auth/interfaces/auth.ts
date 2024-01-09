import { Role } from '@prisma/client';

export class Auth {
  readonly id: string;
  readonly login: string;
  readonly role: Role;
}

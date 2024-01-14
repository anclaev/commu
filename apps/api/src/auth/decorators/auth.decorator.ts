import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from '@prisma/client';

import JwtAuthGuard from '../guards/jwt-auth.guard';
import RoleGuard from '../guards/role.guard';

export const Auth = (roles?: Role[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard),
    UseGuards(RoleGuard(roles))
  );

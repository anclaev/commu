import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import { Role } from '@prisma/client';

const RoleGuard = (roles?: Role[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(ctx: ExecutionContext) {
      const { user } = ctx.switchToHttp().getRequest();

      if (roles) return roles.includes(user.role);

      return true;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;

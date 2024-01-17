/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (
  _next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const user = authService.currentUser;

  if (user) return true;

  return authService.check(state.url);
};

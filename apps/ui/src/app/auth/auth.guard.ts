/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.currentUser;

  if (user) {
    if (route.data['roles'] && route.data['roles'].indexOf(user.role) === -1) {
      router.navigate(['/']);

      return false;
    }

    return true;
  }

  return authService.check(state.url, route.data['roles']);
};

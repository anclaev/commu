import { Route } from '@angular/router';

import { authGuard } from './auth/auth.guard';

import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const appRoutes: Route[] = [
  {
    path: '',

    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

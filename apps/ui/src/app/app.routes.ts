import { Route } from '@angular/router';

import { authGuard } from './auth/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

import { provideHttpInterceptors } from './core/helpers/http.interceptor';

import { appRoutes } from './app.routes';

import { SnackbarService } from './shared/snackbar/snackbar.service';
import { LoaderService } from './shared/loader/loader.service';
import { AuthService } from './auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes, withViewTransitions()),
    provideHttpInterceptors(),
    provideAngularSvgIcon(),
    { provide: AuthService, useClass: AuthService },
    { provide: LoaderService, useClass: LoaderService },
    { provide: SnackbarService, useClass: SnackbarService },
    importProvidersFrom(HttpClientModule),
  ],
};

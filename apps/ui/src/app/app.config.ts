import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { provideHttpInterceptors } from './core/helpers/http.interceptor';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withViewTransitions()),
    provideAnimationsAsync(),
    provideHttpInterceptors(),
    importProvidersFrom(HttpClientModule),
  ],
};

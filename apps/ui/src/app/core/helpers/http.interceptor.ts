import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { API_URL } from '../../../environments/environment';

import { SnackbarService } from '../../shared/snackbar/snackbar.service';
import { LoaderService } from '../../shared/loader/loader.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private loader: LoaderService,
    private snackbar: SnackbarService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!req.url.includes('assets')) {
      req = req.clone({
        url: `${API_URL}${req.url}`,
        withCredentials: true,
      });
    }

    this.loader.start();

    return next.handle(req).pipe(
      map((event: HttpEvent<unknown>) => {
        this.loader.stop();

        return event;
      })
    );
  }
}

export const provideHttpInterceptors = () => [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true,
  },
];

import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    req = req.clone({
      withCredentials: true,
    });
    return next.handle(req);
  }
}

export const provideHttpInterceptors = () => [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true,
  },
];
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Auth } from 'shared/interfaces/auth-credentials';

import { ENDPOINTS } from '../core';
import { state } from '@angular/animations';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$$: BehaviorSubject<Auth | null> =
    new BehaviorSubject<Auth | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  public get currentUser(): Auth | null {
    return this.user$$.value;
  }

  login(login: string, password: string): Observable<Auth> {
    return this.http
      .post<Auth>(ENDPOINTS.AUTH_SIGN_IN, {
        login,
        password,
      })
      .pipe(
        map((data) => {
          this.user$$.next(data);

          return data;
        })
      );
  }

  logout(): Observable<unknown> {
    return this.http.post(ENDPOINTS.AUTH_LOGOUT, {});
  }

  refreshToken(): Observable<Auth> {
    return this.http.put<Auth>(ENDPOINTS.AUTH_REFRESH, {});
  }

  getCredentials(): Observable<Auth> {
    return this.http.get<Auth>(ENDPOINTS.AUTH_CHECK).pipe(
      map((data) => {
        this.user$$.next(data);
        return data;
      }),
      catchError(() => {
        return this.refreshToken().pipe(
          map((data) => {
            this.user$$.next(data);

            return data;
          })
        );
      })
    );
  }

  check(returnUrl: string, roles?: string[]): Observable<boolean> {
    return this.getCredentials().pipe(
      map((data) => {
        if (roles && roles.indexOf(data.role) === -1) {
          this.router.navigate(['/']);

          return false;
        }
        console.log(returnUrl);
        if (data && returnUrl.includes('/auth')) {
          this.router.navigate(['/']);
        }

        return !!data;
      }),
      catchError((err) => {
        this.router.navigate(['/auth'], {
          queryParams: { returnUrl },
        });

        return of(err !== 'Unauthorized');
      })
    );
  }
}

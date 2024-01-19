import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Auth } from 'shared/interfaces/auth-credentials';

import { SnackbarService } from '../shared/snackbar/snackbar.service';

import { ENDPOINTS } from '../core';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$$: BehaviorSubject<Auth | null> =
    new BehaviorSubject<Auth | null>(null);

  user$: Observable<Auth | null> = this.user$$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  public get currentUser(): Auth | null {
    return this.user$$.value;
  }

  private getSession(): Auth | null {
    const session = sessionStorage.getItem('auth');

    return session ? JSON.parse(session) : null;
  }

  private clearSession(): void {
    sessionStorage.removeItem('auth');
  }

  private setSession(user: Auth): void {
    sessionStorage.setItem('auth', JSON.stringify(user));
  }

  login(login: string, password: string): Observable<Auth | null> {
    return this.http
      .post<Auth>(ENDPOINTS.AUTH_SIGN_IN, {
        login,
        password,
      })
      .pipe(
        map((data) => {
          this.user$$.next(data);
          this.setSession(data);

          return data;
        }),
        catchError((err: HttpErrorResponse, obs) => {
          if (err.status === 0) {
            this.snackbar.show('Сервер недоступен');

            return of(null);
          }

          return obs;
        })
      );
  }

  private clearAuth(): void {
    this.user$$.next(null);
    this.clearSession();
    this.router.navigate(['/auth']);
  }

  logout(): Observable<unknown> {
    return this.http.post(ENDPOINTS.AUTH_LOGOUT, {}).pipe(
      map(() => {
        this.clearAuth();
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) this.clearAuth();

        return of(null);
      })
    );
  }

  refreshToken(): Observable<Auth> {
    return this.http.put<Auth>(ENDPOINTS.AUTH_REFRESH, {});
  }

  getCredentials(): Observable<Auth | null> {
    return this.http.get<Auth>(ENDPOINTS.AUTH_CHECK).pipe(
      map((data) => {
        this.user$$.next(data);
        this.setSession(data);

        return data;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.snackbar.show('Сервер недоступен');
          const session = this.getSession();

          if (session) {
            return of(session);
          }

          return of(null);
        }

        return this.refreshToken().pipe(
          map((data) => {
            this.user$$.next(data);
            this.setSession(data);
            return data;
          })
        );
      })
    );
  }

  check(returnUrl: string, roles?: string[]): Observable<boolean> {
    return this.getCredentials().pipe(
      map((data) => {
        if (!data) {
          this.router.navigate(['/auth'], {
            queryParams: { returnUrl },
          });

          return false;
        }

        if (data && roles && roles.indexOf(data.role) === -1) {
          this.router.navigate(['/']);

          return false;
        }

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

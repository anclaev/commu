import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Auth } from 'shared/interfaces/auth-credentials';

import { ENDPOINTS } from '../core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient) {}

  get isLoggedIn() {
    return this.isAuthenticated;
  }

  login(login: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(
      ENDPOINTS.AUTH_SIGN_IN,
      {
        login,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<unknown> {
    return this.http.post(ENDPOINTS.AUTH_LOGOUT, {}, httpOptions);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuth = false;

  constructor() {}

  get isLoggedIn() {
    return this._isAuth;
  }
}

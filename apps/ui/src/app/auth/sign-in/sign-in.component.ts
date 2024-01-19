import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { Subscription } from 'rxjs';

import { RecoverPasswordComponent } from './recover-password/recover-password.component';

import { SnackbarService } from '../../shared/snackbar/snackbar.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'comduty-auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;

  private _returnUrl: string = '/';
  private _unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: Dialog,
    private auth: AuthService,
    private snackbar: SnackbarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.auth.currentUser) {
      this.router.navigate(['/']);
    }

    this.signInForm = fb.group({
      login: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    this._returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  private validateForm(
    login: AbstractControl,
    password: AbstractControl
  ): boolean {
    if (login.invalid && password.invalid) {
      this.snackbar.show('Некорректные данные');
      return false;
    }

    if (login.invalid) {
      this.snackbar.show('Некорректный логин');
      return false;
    }

    if (password.invalid) {
      this.snackbar.show('Некорректный пароль');
      return false;
    }

    return true;
  }

  signIn() {
    const { login, password } = this.signInForm.controls;

    if (!this.validateForm(login, password)) return;

    this._unsubscribe.push(
      this.auth.login(login.value.trim(), password.value.trim()).subscribe({
        error: () => {
          this.snackbar.show('Вход не выполнен');
          this.signInForm.controls['password'].setValue('');
        },
        next: (data) => {
          if (!data) return;

          this.snackbar.show(`Привет, ${data!.name || data!.role}!`);

          this.router.navigate([this._returnUrl]);
        },
      })
    );
  }

  recover() {
    this.dialog.open(RecoverPasswordComponent, {
      width: '90%',
      maxWidth: '440px',
    });
  }

  ngOnDestroy() {
    this._unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

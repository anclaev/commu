import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { RecoverPasswordComponent } from './recover-password/recover-password.component';

import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { SNACKBAR_CONFIG } from '../../shared/types/snackbar-config';

import { AuthService } from '../auth.service';

@Component({
  selector: 'comduty-auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  private returnUrl: string = '/';

  constructor(
    private fb: FormBuilder,
    private sb: MatSnackBar,
    private dialog: Dialog,
    private auth: AuthService,
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
    const alreadyAuthenticated = Boolean(
      this.route.snapshot.queryParams['redirect']
    );

    if (!alreadyAuthenticated) this.router.navigate(['/']);

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  private showAlarm(data: string) {
    this.sb.openFromComponent(AlarmComponent, {
      ...SNACKBAR_CONFIG,
      data,
    });
  }

  private validateForm(
    login: AbstractControl,
    password: AbstractControl
  ): boolean {
    if (login.invalid && password.invalid) {
      this.showAlarm('Некорректные данные');
      return false;
    }

    if (login.invalid) {
      this.showAlarm('Некорректный логин');
      return false;
    }

    if (password.invalid) {
      this.showAlarm('Некорректный пароль');
      return false;
    }

    return true;
  }

  signIn() {
    const { login, password } = this.signInForm.controls;

    if (!this.validateForm(login, password)) return;

    this.auth.login(login.value.trim(), password.value.trim()).subscribe({
      error: (error) => {
        console.log(error);
        this.showAlarm('Вход не выполнен');
        this.signInForm.controls['password'].setValue('');
      },
      next: (data) => {
        this.showAlarm(`Привет, ${data.name || data.role}!`);

        this.router.navigate([this.returnUrl]);
      },
    });
  }

  recover() {
    this.dialog.open(RecoverPasswordComponent, {
      width: '90%',
      maxWidth: '440px',
    });
  }
}

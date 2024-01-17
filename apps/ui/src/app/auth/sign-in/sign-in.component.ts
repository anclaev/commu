import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { SNACKBAR_CONFIG } from '../../shared/types/snackbar-config';

@Component({
  selector: 'comduty-auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private sb: MatSnackBar) {
    this.signInForm = fb.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  private showNotification() {
    this.sb.openFromComponent(AlarmComponent, {
      ...SNACKBAR_CONFIG,
      data: 'Авторизация пройдена',
    });
  }

  signIn() {
    this.showNotification();
  }
}

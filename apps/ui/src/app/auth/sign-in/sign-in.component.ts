import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { AlarmComponent } from '../../shared/alarm/alarm.component';

import { SNACKBAR_CONFIG } from '../../shared/types/snackbar-config';

@Component({
  selector: 'comduty-auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sb: MatSnackBar,
    private dialog: Dialog
  ) {
    this.signInForm = fb.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  private showAlarm(data: string) {
    this.sb.openFromComponent(AlarmComponent, {
      ...SNACKBAR_CONFIG,
      data,
    });
  }

  signIn() {
    this.showAlarm('Привет!');
  }

  recover() {
    this.dialog.open(RecoverPasswordComponent, {
      width: '90%',
      maxWidth: '440px',
    });
  }
}

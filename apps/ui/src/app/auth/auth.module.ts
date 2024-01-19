import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';

import { RecoverPasswordComponent } from './sign-in/recover-password/recover-password.component';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DialogModule,
    SnackbarComponent,
  ],
  declarations: [AuthComponent, SignInComponent, RecoverPasswordComponent],
})
export class AuthModule {}

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  providers: [AuthService],
  declarations: [AuthComponent, SignInComponent],
})
export class AuthModule {}

import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';

import { AlarmComponent } from './alarm/alarm.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
  declarations: [AlarmComponent],
  exports: [AlarmComponent],
})
export class SharedModule {}

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

import { Injectable } from '@angular/core';

import { SnackbarComponent } from './snackbar.component';

export const SNACKBAR_CONFIG: MatSnackBarConfig = {
  horizontalPosition: 'right',
  verticalPosition: 'bottom',
  panelClass: 'snackbar',
};

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private sb: MatSnackBar) {}

  show(data: string, config?: MatSnackBarConfig): MatSnackBarRef<unknown> {
    return this.sb.openFromComponent(SnackbarComponent, {
      ...SNACKBAR_CONFIG,
      ...config,
      data,
    });
  }
}

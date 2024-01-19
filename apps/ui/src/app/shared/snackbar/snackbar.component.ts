import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

import { Component, Inject, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatIconModule],
  standalone: true,
  selector: 'comduty-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);

  title: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
    this.title = data;
  }
}

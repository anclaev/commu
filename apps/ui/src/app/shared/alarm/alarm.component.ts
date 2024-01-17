import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { Component, Inject, inject } from '@angular/core';

@Component({
  selector: 'comduty-alarm',
  templateUrl: './alarm.component.html',
  styleUrl: './alarm.component.css',
})
export class AlarmComponent {
  snackBarRef = inject(MatSnackBarRef);
  title: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
    this.title = data;
  }
}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

import { SNACKBAR_CONFIG } from '../../../shared/types/snackbar-config';
import { AlarmComponent } from '../../../shared/alarm/alarm.component';

@Component({
  selector: 'comduty-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss',
})
export class RecoverPasswordComponent {
  recoverForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sb: MatSnackBar,
    public dialogRef: DialogRef<string>
  ) {
    this.recoverForm = fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(5), Validators.email],
      ],
    });
  }

  private showAlarm(data: string) {
    this.sb.openFromComponent(AlarmComponent, {
      ...SNACKBAR_CONFIG,
      data,
    });
  }

  recover() {
    if (this.recoverForm.controls['email'].invalid) {
      this.showAlarm('Некорректная почта');
      return;
    }

    this.sb.openFromComponent(AlarmComponent, {
      ...SNACKBAR_CONFIG,
      data: `Ссылка для восстановления отправлена на: ${this.recoverForm.controls['email'].value}`,
    });

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

import { SnackbarService } from '../../../shared/snackbar/snackbar.service';

@Component({
  selector: 'commu-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss',
})
export class RecoverPasswordComponent {
  recoverForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    public dialogRef: DialogRef<string>
  ) {
    this.recoverForm = fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(5), Validators.email],
      ],
    });
  }

  recover() {
    if (this.recoverForm.controls['email'].invalid) {
      this.snackbar.show('Некорректная почта');
      return;
    }

    this.snackbar.show(
      `Ссылка для восстановления отправлена на: ${this.recoverForm.controls['email'].value}`
    );

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'comduty-auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signInForm = fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signIn() {
    console.log(this.signInForm.controls['login'].value);

    console.log(this.signInForm.controls['password'].value);
  }
}

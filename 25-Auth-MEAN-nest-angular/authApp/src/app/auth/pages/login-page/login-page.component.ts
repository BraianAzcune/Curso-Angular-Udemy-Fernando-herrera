import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  disableSubmitButton = false;
  loadingSubmitButton = false;

  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  }
  );

  login() {
    this.disableSubmitButton = true;
    this.loadingSubmitButton = true;
    console.log(this.loginForm.value);
  }
}

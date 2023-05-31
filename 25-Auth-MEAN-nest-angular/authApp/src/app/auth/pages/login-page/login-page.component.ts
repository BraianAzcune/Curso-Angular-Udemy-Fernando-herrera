import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {



  disableSubmitButton = false;
  loadingSubmitButton = false;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly loginForm = this.fb.group({
    email: ["pedro@test.com", [Validators.required, Validators.email]],
    password: ["123456", [Validators.required, Validators.minLength(6)]]
  }
  );

  login() {
    const { email, password } = this.loginForm.value;
    if (!email || !password) {
      alert("este error no debe ocurrir nunca, email y password estan vacios en funcion login");
      return;
    }

    this.disableSubmitButton = true;
    this.loadingSubmitButton = true;

    this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl("/dashboard");
        },
        error: (errMessage) => {
          Swal.fire("Error", errMessage, "error");
        }
      })

    this.disableSubmitButton = false;
    this.loadingSubmitButton = false;
  }
}

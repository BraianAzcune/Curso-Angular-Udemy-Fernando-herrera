import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "login",
        component: LoginComponent,
        title: "Ingresar"
      },
      {
        path: "signup",
        component: SignUpComponent,
        title:  "Registrarse",
      },
      {
        path:"**",
        redirectTo: "login"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

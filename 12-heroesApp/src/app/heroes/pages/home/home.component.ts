import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../auth/services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [
    `
      .content {
        margin: 10px;
      }
    `,
  ],
})
export class HomeComponent {

  get username(){
    return this.authService.auth.usuario;
  }

  constructor(private router:Router, private authService:AuthService) {}


  logout(){
    this.router.navigate(["./auth"]);
  }
}

import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  private readonly authService = inject(AuthService);
  get user() {
    return this.authService.currentUser();
  }

  logout(){
    this.authService.logout();
  }
}

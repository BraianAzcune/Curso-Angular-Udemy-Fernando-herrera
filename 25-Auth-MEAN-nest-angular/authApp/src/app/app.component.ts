import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces/auth-status.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'authApp';
  private readonly authService = inject(AuthService);
  isAuthCheckin = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) return true;
    return false;
  });
  private readonly router = inject(Router);
  /**
   * Se dispara siempre la primera vez que se carga el componente, y cuando cambia algunas de las
   * señales que contiene
   */
  authStatusChangedEffect = effect(() => {
    console.log('effecto', this.authService.authStatus());
    switch (this.authService.authStatus()) {
      case AuthStatus.checking: return;
      case AuthStatus.authenticated:
        // TODO aca hay un problema, ya que si estas logeado y queres ir al login te manda al dashboard.
        this.router.navigateByUrl(localStorage.getItem('pathRequested') ?? 'auth/login');
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('auth/login');
        return;
    }
  });

}

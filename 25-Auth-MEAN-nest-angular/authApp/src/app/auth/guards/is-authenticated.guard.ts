import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.authStatus() === AuthStatus.authenticated) {
    // si existieran rangos de autenticacion, habria que ver las credenciales a detalle, pero esa logica, deberia estar en otros guards
    return true;
  }
  if (authService.authStatus() === AuthStatus.checking) {

    return false;
  }
  const router = inject(Router);
  router.navigateByUrl('auth/login');
  return false;
};

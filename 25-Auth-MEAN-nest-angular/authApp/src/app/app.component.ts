import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces/auth-status.enum';
import { Router, GuardsCheckStart, GuardsCheckEnd } from '@angular/router';
import { filter } from 'rxjs';
import { StorageService, keyType } from './shared/services/storage.service';

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

  constructor(private readonly storage: StorageService){
    this.subscribeToGuardsCheckEndEvent();
  }
  /**
   * Se dispara siempre la primera vez que se carga el componente, y cuando cambia algunas de las
   * señales que contiene
   */
  // authStatusChangedEffect = effect(() => {
  //   console.log('effecto', this.authService.authStatus());
  //   switch (this.authService.authStatus()) {
  //     case AuthStatus.checking: return;
  //     case AuthStatus.authenticated:
  //       // TODO aca hay un problema, ya que si estas logeado y queres ir al login te manda al dashboard.
  //       this.router.navigateByUrl(localStorage.getItem('pathRequested') ?? 'auth/login');
  //       return;
  //     case AuthStatus.notAuthenticated:
  //       this.router.navigateByUrl('auth/login');
  //       return;
  //   }
  // });


  subscribeToGuardsCheckEndEvent(){
    this.router.events.pipe(
      filter(event => event instanceof GuardsCheckEnd)
    ).subscribe(event=>{
      /**
       * Guardar la ultima URL que se intento acceder con acceso denegado, para poder redirigirlo ahi
       * si posee acceso en authStatusChangedEffect
       */
      const e = event as GuardsCheckEnd;
      if(e.shouldActivate == false && this.authService.authStatus() === AuthStatus.notAuthenticated){
        // si es una URL de acceso rechazado y no esta autenticado guardar esa direccion, cuando este autenticado se lo redirecionara ahi
        this.storage.set(keyType.pathRequested, e.url);
      }
    });
  }

}

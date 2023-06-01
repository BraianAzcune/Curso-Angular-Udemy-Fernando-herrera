import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { LoginResponse } from '../interfaces/login-response.interface';
import { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { CheckAuthStatusResponse } from '../interfaces/check-auth-status-response.interface';

enum ApiPath {
  login = 'auth/login',
  checkToken = 'auth/check-token'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly currentUser = computed(() => this._currentUser);
  public readonly authStatus = computed(() => this._authStatus());

  private readonly baseUrl: string = environment.apiUrl;
  private readonly http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  constructor() {
    console.log('servicio instanciado');
    // revisar en cuanto es instanciado
    this.checkAuthStatus().subscribe();
  }


  login(email: string, password: string): Observable<boolean> {
    //  TODO, no me gusta esta forma, manejar errores es algo malo, mejor que devuelva falso y decir que estan mal las credenciales y listo.
    // TODO, hay que considerar casos 500, cassos de not found, bad request, y unauthorized
    return this.http.post<LoginResponse>(this.baseUrl + ApiPath.login, { email, password }).
      pipe(
        map(this.setStatusAndUser),
        catchError(err => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return throwError(() => err.error.message[0]);
        })
      );
  }

  logout(){
    this._authStatus.set(AuthStatus.notAuthenticated);
    this._currentUser.set(null);
    localStorage.setItem('token-angular', '');
  }

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token-angular');
    if (!token) {
      this._authStatus.set(AuthStatus.notAuthenticated);
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<CheckAuthStatusResponse>(this.baseUrl + ApiPath.checkToken, { headers })
      .pipe(
        map(this.setStatusAndUser),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );
  }

  private readonly setStatusAndUser = (obj: LoginResponse | CheckAuthStatusResponse) => {
    this._authStatus.set(AuthStatus.authenticated);
    this._currentUser.set(obj.user);
    // TODO se podria usar session storage o cookies, mucho mejor.
    localStorage.setItem('token-angular', obj.token);
    return true;
  };
}

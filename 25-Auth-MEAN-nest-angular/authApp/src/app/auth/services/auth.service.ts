import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { LoginResponse } from '../interfaces/login-response.interface';
import { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';

enum ApiPath {
  login = "auth/login"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly currentUser = computed(() => this._currentUser);
  public readonly authStatus = computed(() => this._authStatus);

  private readonly baseUrl: string = environment.apiUrl;
  private readonly http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  login(email: string, password: string): Observable<boolean> {
    //  TODO, no me gusta esta forma, manejar errores es algo malo, mejor que devuelva falso y decir que estan mal las credenciales y listo.
    // TODO, hay que considerar casos 500, cassos de not found, bad request, y unauthorized
    return this.http.post<LoginResponse>(this.baseUrl + ApiPath.login, { email, password }).
      pipe(
        tap(loginResponse => {
          this._authStatus.set(AuthStatus.authenticated);
          this._currentUser.set(loginResponse.user);
          // TODO se podria usar session storage o cookies, mucho mejor.
          localStorage.setItem("token-angular", loginResponse.token);
        }),
        map(() => true),
        catchError(err => {
          console.log(err)
          return throwError(() => err.error.message[0])
        })
      )
  }
}

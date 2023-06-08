import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { StorageService, keyType } from 'src/app/shared/services/storage.service';
import { environment } from 'src/environments/environments';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { CheckAuthStatusResponse } from '../interfaces/check-auth-status-response.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { User } from '../interfaces/user.interface';

const ApiPath =  {
  'login' : 'auth/login',
  'checkToken' : 'auth/check-token'
};

function addBaseUrlToEnumValues(baseUrl: string, enumObject: { [key: string]: string }){
  for (const key of Object.keys(enumObject)) {
    enumObject[key] = baseUrl + enumObject[key];
  }
}
const baseUrl: string = environment.apiUrl;
addBaseUrlToEnumValues(baseUrl, ApiPath);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly currentUser = computed(() => this._currentUser);
  public readonly authStatus = computed(() => this._authStatus());

  private readonly http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // eslint-disable-next-line no-unused-vars
  constructor(private readonly storage: StorageService) {
    // revisar en cuanto es instanciado
    this.checkAuthStatus().subscribe();
  }


  login(email: string, password: string): Observable<boolean> {
    //  TODO, no me gusta esta forma, manejar errores es algo malo, mejor que devuelva falso y decir que estan mal las credenciales y listo.
    // TODO, hay que considerar casos 500, cassos de not found, bad request, y unauthorized
    return this.http.post<LoginResponse>(ApiPath.login, { email, password }).
      pipe(
        map(this.setStatusAndUser),
        catchError(err => {
          this.logout();
          return throwError(() => err.error.message[0]);
        })
      );
  }

  logout(){
    this._authStatus.set(AuthStatus.notAuthenticated);
    this._currentUser.set(null);
    this.storage.delete(keyType.angularToken);
  }

  checkAuthStatus(): Observable<boolean> {
    const token = this.storage.get(keyType.angularToken);
    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<CheckAuthStatusResponse>(ApiPath.checkToken, { headers })
      .pipe(
        map(this.setStatusAndUser),
        catchError(() => {
          this.logout();
          return of(false);
        })
      );
  }

  private readonly setStatusAndUser = (obj: LoginResponse | CheckAuthStatusResponse) => {
    this._authStatus.set(AuthStatus.authenticated);
    this._currentUser.set(obj.user);
    this.storage.set(keyType.angularToken, obj.token);
    return true;
  };
}

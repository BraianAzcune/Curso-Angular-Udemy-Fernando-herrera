import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Usuario } from "../interfaces/usuario.interface";
import { map, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private baseUrl:string = environment.baseUrl;
  private _auth: Usuario | undefined;

  get auth(){
    return {...this._auth};
  }

  verificarAutenticacion(): Observable<boolean>{
    const v = localStorage.getItem("id");
    if(v == null){
      return of(false);
    }
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/1`).pipe(
      map( user => {
        this._auth = user;
        return true;
      })
    );

  }

  constructor(private http:HttpClient) { }

  login():Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/1`).pipe(
      tap(auth => this._auth = auth),
      tap(auth => localStorage.setItem("id",auth.id))
    );
  }
}

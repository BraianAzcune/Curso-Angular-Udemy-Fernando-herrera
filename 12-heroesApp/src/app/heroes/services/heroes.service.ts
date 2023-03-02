import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getHeroes() {
    return this.http.get<Heroe[]>(this.baseUrl + '/heroes');
  }

  getHeroeById(id: string) {
    return this.http.get<Heroe>(this.baseUrl + `/heroes/${id}`);
  }

  getSugerencias(termino: string) {
    return this.http.get<Heroe[]>(
      `${this.baseUrl}/heroes?q=${termino}&_limit=5`
    );
  }

  getPublishers() {
    return this.http.get<string[]>(`${this.baseUrl}/publishers`);
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseUrl}/heroes/`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    if (!heroe.id) {
      alert('Error el heroe a actualizar no tiene su id');
      return of(heroe);
    }
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  }
  borrarHeroe(heroe: Heroe): Observable<any> {
    if (!heroe.id) {
      alert('Error el heroe a borrar no tiene su id');
      return of(heroe);
    }
    return this.http.delete<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`);
  }
}

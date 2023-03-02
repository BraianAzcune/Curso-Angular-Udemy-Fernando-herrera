import { Injectable } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';

@Injectable()
export class DbzService {
  get personajes() {
    return [...this._personajes];
  }
  private _personajes: Personaje[] = [
    {
      nombre: 'Goku',
      poder: 15000,
    },
    {
      nombre: 'Vegeta',
      poder: 14000,
    },
  ];
  agregarPersonaje(p: Personaje) {
    this._personajes.push(p);
  }
}

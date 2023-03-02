import { Component } from '@angular/core';

@Component({
  selector: 'app-heroe',
  templateUrl: 'heroe.component.html',
})
export class HeroeComponent {
  nombre = 'Iron Man';
  edad = 44;

  get nombreCapitalizado() {
    return this.nombre.toUpperCase();
  }

  getName() {
    return `${this.nombre} - ${this.edad}`;
  }

  cambiarNombre() {
    this.nombre = 'Spiderman';
  }

  cambiarEdad() {
    this.edad = 20;
  }
}

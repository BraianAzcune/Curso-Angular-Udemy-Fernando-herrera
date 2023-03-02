import { Component } from '@angular/core';
import { Color, Heroe } from '../../interfaces/ventas.interface';
import { OrdenarPor, tiposOrdenes } from '../../pipes/ordenar.pipe';

@Component({
  selector: 'app-ordenar',
  templateUrl: './ordenar.component.html',
  styles: [],
})
export class OrdenarComponent {
  enMayusuculas = true;
  ordenarPor: OrdenarPor = '';
  heroes: Heroe[] = [
    {
      nombre: 'Superman',
      vuela: true,
      color: Color.azul,
    },
    {
      nombre: 'Batman',
      vuela: false,
      color: Color.negro,
    },
    {
      nombre: 'Linterna Verde',
      vuela: true,
      color: Color.verde,
    },
  ];
  tiposOrdenes;
  constructor() {
    this.tiposOrdenes = tiposOrdenes.slice(1);
  }

  cambiarOrden(valor: OrdenarPor) {
    this.ordenarPor = valor;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Color, Heroe } from '../interfaces/ventas.interface';

export const tiposOrdenes = ['', 'nombre', 'vuela', 'color'] as const;
export type OrdenarPor = typeof tiposOrdenes[number];

@Pipe({
  name: 'ordenar',
})
export class OrdenarPipe implements PipeTransform {
  transform(value: Heroe[], ordenarPor: OrdenarPor): Heroe[] {
    switch (ordenarPor) {
      case 'nombre':
        return value.sort((a, b) => (a.nombre < b.nombre ? -1 : 1));
      case 'vuela':
        return value.sort((a, b) => (a.vuela > b.vuela ? -1 : 1));
      case 'color':
        return value.sort((a, b) => (a.color < b.color ? -1 : 1));
      default:
        return value;
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagenHeroe',
})
export class ImagenHeroePipe implements PipeTransform {
  transform(heroe: Heroe | undefined): string {
    if (!heroe || !heroe.id) return 'assets/heroes/no-heroe.png';
    if (heroe.alt_img) return heroe.alt_img;
    return `assets/heroes/${heroe.id}.jpg`;
  }
}

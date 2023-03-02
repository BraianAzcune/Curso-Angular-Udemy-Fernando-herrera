import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mayuscula',
})
export class MayusculaPipe implements PipeTransform {
  transform(value: string, mayusculas = true): string {
    if (mayusculas) return value.toUpperCase();
    return value.toLowerCase();
  }
}

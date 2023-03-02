import { Component } from '@angular/core';

@Component({
  selector: 'app-contador',
  template: `
    <p>
      la base es <strong>{{ base }}</strong>
    </p>

    <span>{{ contador }}</span>

    <div>
      <button (click)="acumular(base)">sumar</button>
      <button (click)="acumular(-base)">restar</button>
    </div>
  `,
})
export class ContadorComponent {
  contador = 0;
  base = 10;

  acumular(v: number) {
    this.contador += v;
  }
}

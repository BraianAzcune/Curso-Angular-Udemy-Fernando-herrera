import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  heroes: string[] = ['spiderman', 'iron man', 'batman'];
  ultimoBorrado: string = '';

  constructor() {}

  ngOnInit(): void {}

  borrarHeroe() {
    this.ultimoBorrado = this.heroes.pop() ?? this.ultimoBorrado;
  }
}

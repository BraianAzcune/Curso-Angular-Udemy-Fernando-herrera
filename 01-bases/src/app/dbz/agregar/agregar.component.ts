import { Component } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent {
  constructor(private dbzService: DbzService) {}
  // @Input()
  // nuevo!: Personaje;
  // @Output() onNewPersonaje: EventEmitter<Personaje> =
  //   new EventEmitter<Personaje>();
  nuevo: Personaje = {
    nombre: '',
    poder: 1,
  };

  agregarPersonaje() {
    if (this.nuevo.nombre == '') return;
    // this.onNewPersonaje.emit({ ...this.nuevo });
    this.dbzService.agregarPersonaje({ ...this.nuevo });
    this.nuevo.nombre = '';
    this.nuevo.poder = 0;
  }
}

import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css'],
})
export class PorPaisComponent {
  paisesSugerencia: Country[] = [];
  termino: string = '';
  noEncontrado = false;
  paises: Country[] = [];
  constructor(private paisService: PaisService) {}
  buscar(termino: string) {
    this.paisesSugerencia = [];
    this.termino = termino;
    this.paises = [];
    this.noEncontrado = false;
    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises) => {
        this.paises = paises;
      },
      error: (err) => {
        if (err.status == 404) {
          this.noEncontrado = true;
        }
      },
    });
  }

  sugerencias(semiTermino: string) {
    this.paisService.buscarPais(semiTermino).subscribe({
      next: (paises) => {
        this.paisesSugerencia = paises.splice(0, 5);
      },
      error: () => {
        this.paisesSugerencia = [];
      },
    });
  }
}

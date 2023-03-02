import { Component } from '@angular/core';
import { Country } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css'],
})
export class PorCapitalComponent {
  termino: string = '';
  noEncontrado = false;
  paises: Country[] = [];
  constructor(private paisService: PaisService) {}
  buscar(termino: string) {
    this.termino = termino;
    this.paises = [];
    this.noEncontrado = false;
    this.paisService.buscarCapital(this.termino).subscribe({
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
    // TODO crear sugerencias
  }
}

import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Idd, Country } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css'],
  animations: [
    trigger('info', [
      transition(':leave', [
        animate('300ms', style({ transform: 'translateY(-100px)' })),
      ]),
    ]),
  ],
})
export class VerPaisComponent implements OnInit {
  idiomas: string[] = [];
  pais!: Country;
  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((param: any) =>
          this.paisService.buscarPaisPorCodigo(param['id'])
        ),
        tap(console.log)
      )
      .subscribe((pais) => {
        this.pais = pais;
        this.idiomas = Object.entries(this.pais.languages ?? []).map(
          (obj) => obj[1]
        );
      });
  }
}

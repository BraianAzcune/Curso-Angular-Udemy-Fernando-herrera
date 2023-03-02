import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { Pais } from '../../interfaces/Paises.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css'],
})
export class SelectorPageComponent implements OnInit {
  // eslint-disable-next-line no-unused-vars
  constructor(private fb: FormBuilder, private paisesServices: PaisesService) {}

  regiones: string[] = [];
  paises: Pais[] = [];
  fronteras: Pais[] = [];

  formulario = this.fb.group({
    region: ['', [Validators.required]],
    pais: [{ value: '', disabled: true }, [Validators.required]],
    frontera: [{ value: '', disabled: true }, [Validators.required]],
  });

  ngOnInit(): void {
    this.regiones = this.paisesServices.regiones;
    // cuando cambie la region
    this.formulario
      .get('region')
      ?.valueChanges.pipe(
        tap((x) => {
          this.formulario.controls.pais.reset('');
          !!x
            ? this.formulario.controls.pais.enable()
            : this.formulario.controls.pais.disable();
        }),
        filter((x) => !!x),
        distinctUntilChanged(),
        switchMap((regionSeleccionada) =>
          this.paisesServices.getPaisesPorRegion(regionSeleccionada)
        )
      )
      .subscribe((paises) => (this.paises = paises));
    // cuando cambie el pais
    this.formulario
      .get('pais')
      ?.valueChanges.pipe(
        tap((x) => {
          this.formulario.controls.frontera.reset('');
          !!x
            ? this.formulario.controls.frontera.enable()
            : this.formulario.controls.frontera.disable();
        }),
        filter((x) => !!x),
        distinctUntilChanged(),
        switchMap((paisCca3) =>
          this.paisesServices.getPaisesFronterizos(paisCca3)
        )
      )
      .subscribe((paisesFronterizos) => {
        this.fronteras = this.paisesServices.mapCca3ToPaisName(
          paisesFronterizos,
          this.paises
        );
      });
  }

  guardar() {
    console.log(this.formulario.value);
  }
}

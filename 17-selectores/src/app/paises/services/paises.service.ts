import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from '../interfaces/Paises.interface';
import { EMPTY, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  // eslint-disable-next-line no-unused-vars
  constructor(private http: HttpClient) {}

  private _regiones: string[] = [
    'Africa',
    'America',
    'Asia',
    'Europe',
    'Oceania',
  ];
  get regiones(): string[] {
    return [...this._regiones];
  }
  private urlRegions(region: string) {
    return `https://restcountries.com/v3.1/region/${region}?fields=cca3,name`;
  }
  private urlPaisesFronterizos(pais: string) {
    return `https://restcountries.com/v3.1/alpha/${pais}?fields=borders`;
  }

  getPaisesPorRegion(region: string | null) {
    if (region == null) return EMPTY;
    return this.http
      .get<Pais[]>(this.urlRegions(region))
      .pipe(
        map((paises) =>
          paises.sort((p1, p2) => p1.name.common.localeCompare(p2.name.common))
        )
      );
  }

  /**
   *
   * @param paisCca3 codigo de 3 digitos que distingue al pais
   * @returns lista de string con los codigos de 3 digitos de cada pais
   */
  getPaisesFronterizos(paisCca3: string | null) {
    if (paisCca3 == null) return EMPTY;
    return this.http
      .get<{ borders: string[] }>(this.urlPaisesFronterizos(paisCca3))
      .pipe(
        map((paises) => paises.borders),
        map((paises) => paises.sort())
      );
  }

  public mapCca3ToPaisName(paisesCca3: string[], paises: Pais[]): Pais[] {
    const rta: Pais[] = paisesCca3.map((cca3) => {
      const pais = paises.find((pais) => pais.cca3 == cca3);
      if (pais == undefined) {
        return {
          cca3,
          name: {
            common: 'name not found, code= ' + cca3,
          },
        } as Pais;
      }
      return pais;
    });
    return rta;
  }
}

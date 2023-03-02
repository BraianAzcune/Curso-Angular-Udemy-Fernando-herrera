import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY, take, Subject } from 'rxjs';
import { Country } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private datosSolicitados;

  private urlSearchByPaisName = 'https://restcountries.com/v3.1/name/';
  private urlSearchByCapitalName = 'https://restcountries.com/v3.1/capital/';
  private urlPaisByCode = 'https://restcountries.com/v3.1/alpha/';
  private urlPaisesByRegionCode = 'https://restcountries.com/v2/regionalbloc/';
  constructor(private http: HttpClient) {
    this.datosSolicitados = new HttpParams().set(
      'fields',
      'name,capital,alpha2Code,cca2,flags,population'
    );
  }

  buscarPais(nombrePais: string): Observable<Country[]> {
    if (isEmpty(nombrePais)) return EMPTY;

    return this.http.get<Country[]>(this.urlSearchByPaisName + nombrePais, {
      params: this.datosSolicitados,
    });
  }

  buscarCapital(nombreCapital: string): Observable<Country[]> {
    if (isEmpty(nombreCapital)) return EMPTY;
    return this.http.get<Country[]>(
      this.urlSearchByCapitalName + nombreCapital,
      {
        params: this.datosSolicitados,
      }
    );
  }

  buscarPaisPorCodigo(codigo: string): Observable<Country> {
    if (isEmpty(codigo)) return EMPTY;
    const subject = new Subject<Country>();
    this.http
      .get<Country[]>(this.urlPaisByCode + codigo)
      .pipe(take(1))
      .subscribe((ob) => {
        subject.next(ob[0]);
      });
    return subject;
  }

  buscarPaisesPorRegion(regionCode: string): Observable<Country[]> {
    if (isEmpty(regionCode)) return EMPTY;
    return this.http.get<Country[]>(this.urlPaisesByRegionCode + regionCode, {
      params: this.datosSolicitados,
    });
  }
}

function isEmpty(c: string) {
  return c.trim().length == 0 ? true : false;
}

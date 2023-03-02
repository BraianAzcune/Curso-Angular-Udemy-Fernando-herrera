import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadArray, saveArray } from 'src/utilities/saveLocalStorageObj';
import { GifsResponse, Gif } from '../interfaces/giphySearch';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private urlServicio = 'http://api.giphy.com/v1/gifs/';
  private _apiKey: string = 'c4Bq4JZ3g8GMHFdCLwXcx9BlGbT4ESTO';

  private _historial: string[];
  get historial() {
    return [...this._historial];
  }

  public resultados: Gif[] = [];

  constructor(private http: HttpClient) {
    this._historial = loadArray('historial') as string[];
    setTimeout(() => {
      this.resultados = loadArray('resultados') as Gif[];
    });
  }

  private addHistorial(query: string) {
    /**
     * no distingir mayusculas.
     * agregar al inicio.
     * maximo 10 items.
     * no se permite repeticion.
     * persistir.
     */
    query = query.toLowerCase();
    const createSet = this._historial.indexOf(query) >= 0;
    this._historial.unshift(query);
    this._historial = this._historial.splice(0, 10);
    if (createSet) {
      this._historial = Array.from(new Set(this._historial));
    }
    saveArray('historial', this._historial);
  }

  buscarGifs(query: string) {
    if (query.trim().length == 0) return;
    this.addHistorial(query);
    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', this._historial[0]);
    this.http
      .get<GifsResponse>(`${this.urlServicio}search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;
        saveArray('resultados', this.resultados);
      });
  }
}

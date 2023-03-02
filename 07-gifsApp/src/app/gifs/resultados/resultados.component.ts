import { Component } from '@angular/core';
import { Gif } from '../interfaces/giphySearch';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent {
  private checkResult;
  private intermediateResult: any[] = [];
  get resultados() {
    if (this.checkResult !== this.gifsService.resultados) {
      this.checkResult = this.gifsService.resultados;
      this.intermediateResult = [];
      this.temporalInsert();
    }
    return this.intermediateResult;
  }

  temporalInsert(index: number = 0) {
    if (this.checkResult === this.gifsService.resultados) {
      if (
        this.intermediateResult.length != this.gifsService.resultados.length
      ) {
        this.intermediateResult.push(this.gifsService.resultados[index]);
        setTimeout(() => {
          this.temporalInsert(index + 1);
        }, 50);
      }
    }
  }

  constructor(private gifsService: GifsService) {
    this.checkResult = gifsService.resultados;
  }
}

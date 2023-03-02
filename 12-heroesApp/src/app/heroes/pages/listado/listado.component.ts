import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    `
      .ordenar-btn {
        display: flex;
      }
    `,
  ],
})
export class ListadoComponent implements OnInit {
  heroes: Heroe[] = [];
  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    },(err:HttpErrorResponse)=>{alert(`error al cargar listado= ${err.statusText} estado=${err.status}`)});
  }

  ordenarHeroes() {
    this.heroes.sort((a, b) => {
      return a.superhero.localeCompare(b.superhero);
    });
  }
}

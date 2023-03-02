import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe;
  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.heroesService
      .getSugerencias(this.termino.trim())
      .subscribe((heroes) => {
        this.heroes = heroes;
      });
  }
  opcionSelecionada(event: MatAutocompleteSelectedEvent) {
    const heroe = event.option.value as Heroe;
    if ((heroe as unknown) == '') return;
    if (!heroe.id) {
      alert('Error en los heroes contenidos en el campo de usuario');
      return;
    }
    this.termino = heroe.superhero;
    this.heroesService.getHeroeById(heroe.id).subscribe((h) => {
      this.heroeSeleccionado = h;
    });
  }
}

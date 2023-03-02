import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      .titulo-heroe {
        color: yellow;
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
      }
      img {
        width: 100%;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  publishers: string[] = [];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    publisher: '',
    first_appearance: '',
  };

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.heroeService.getPublishers().subscribe((publishers) => {
      this.publishers = publishers;
    });
    this.activatedRoute.params
      .pipe(
        filter(({ id }) => {
          return id != undefined;
        }),
        switchMap(({ id }) => {
          return this.heroeService.getHeroeById(id);
        })
      )
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardarHeroe() {
    if (!allStringNonEmpty(this.heroe)) {
      alert('Todos los campos deben tener datos');
      return;
    }
    if (this.heroe.id) {
      this.heroeService.actualizarHeroe(this.heroe).subscribe((heroe) => {
        this.heroe = heroe;
        this.mostrarMensajeAbajo('Heroe actualizado');
      });
    } else {
      this.heroeService.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes', heroe.id]);
      });
    }
  }

  borrarHeroe() {
    if (!this.heroe.id) {
      alert('No deberias poder apretar este boton, el heroe no posee un id');
      return;
    }

    this.dialog
      .open(ConfirmarComponent, {
        data: { ...this.heroe },
      })
      .afterClosed()
      .pipe(filter((borrarHeroe) => borrarHeroe))
      .subscribe(() => {
        this.heroeService.borrarHeroe(this.heroe).subscribe(() => {
          this.router.navigate(['/heroes']);
        });
      });
  }

  mostrarMensajeAbajo(msg: string): void {
    this.snackBar.open(msg, undefined, { duration: 2000 });
  }
}

function allStringNonEmpty(obj: Object) {
  return Object.values(obj).every((v) => {
    if (typeof v != 'string') {
      return true;
    }
    return v.trim().length != 0;
  });
}

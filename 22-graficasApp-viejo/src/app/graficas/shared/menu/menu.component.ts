import { Component } from '@angular/core';
import { rutas } from '../../graficas-routing.module';

export interface MenuItem{
  ruta: string,
  texto: string
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuRutas: MenuItem[]= rutas;
}

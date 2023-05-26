import { Component, signal } from '@angular/core';

interface MenuItem {
  path: string,
  titulo: string
}

@Component({
  selector: 'app-signals-layout',
  templateUrl: './signals-layout.component.html',
  styleUrls: ['./signals-layout.component.css']
})
export class SignalsLayoutComponent {
  // menu: MenuItem[] = [
  //   {
  //     path: "counter",
  //     titulo: "Contador"
  //   },
  //   {
  //     path: "properties",
  //     titulo: "Propiedades"
  //   },
  //   {
  //     path: "user-info",
  //     titulo: "Informacion usuario"
  //   },
  // ];

  menu = signal<MenuItem[]>(
    [
      {
        path: "counter",
        titulo: "Contador"
      },
      {
        path: "properties",
        titulo: "Propiedades"
      },
      {
        path: "user-info",
        titulo: "Informacion usuario"
      },
    ]
  );
}

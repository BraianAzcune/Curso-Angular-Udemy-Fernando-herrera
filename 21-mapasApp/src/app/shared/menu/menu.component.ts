import { Component, OnInit } from '@angular/core';
import { MyLinks } from 'src/app/interfacesUtiles';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  activeId='';

  listaLinks:MyLinks[] = [
    {
      path: 'mapas/',
      fragment: 'fullscreen',
      titulo: 'Fullscreen',
    },
    {
      path: 'mapas/',
      fragment: 'zoom-range',
      titulo: 'Zoom range'
    },
    {
      path: 'mapas/',
      fragment: 'marcadores',
      titulo: 'Marcadores'
    },
    {
      path: 'mapas/',
      fragment: 'propiedades',
      titulo: 'Propiedades'
    }
  ];


  ngOnInit(): void {
    this.activeId= this.listaLinks[0].path+this.listaLinks[0].fragment;
  }

}

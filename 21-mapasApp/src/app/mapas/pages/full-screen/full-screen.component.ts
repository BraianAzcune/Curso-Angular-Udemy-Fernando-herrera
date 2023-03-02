import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.css'],
})
export class FullScreenComponent implements OnInit {
  // solucionado con selector de estilos en styles.css
  // @HostBinding('class.d-flex') prueba= true;
  // @HostBinding('class.flex-grow-1') prueba2= true;

  ngOnInit(): void {


    const map = new mapboxgl.Map({
      container: 'mapa-fullscreen', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-61.551315,-34.858458], // starting position [lng, lat]
      zoom: 14, // starting zoom

    });
  }

}

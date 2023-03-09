import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { fromEvent } from 'rxjs';
import { ArrayUtils } from 'src/app/utils/ArrayUtils';


interface Marcador {
  marker: mapboxgl.Marker,
  color: string,
  nombre: string
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements OnInit {

  mapa!: mapboxgl.Map;
  currentZoom = 14;
  coordenadas: number[] = [-61.551315,-34.858458];

  marcadores: Marcador[] = [];

  ngOnInit(): void {
    this.mapa = new mapboxgl.Map({
      container: 'mapa-marcador', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.coordenadas as mapboxgl.LngLatLike, // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
    });
    const imagenMarcador = document.createElement('div');
    imagenMarcador.innerHTML = 'hola';
    const marcador = new mapboxgl.Marker({element:imagenMarcador}).setLngLat(this.coordenadas as mapboxgl.LngLatLike).addTo(this.mapa);


    const coordenada$ = fromEvent(this.mapa,'move');
    coordenada$.subscribe(()=>{
      this.coordenadas = this.mapa.getCenter().toArray();
    });

  }
  crearMarcador(){
    // eslint-disable-next-line no-bitwise
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker({draggable:true, color}).setLngLat(this.coordenadas as mapboxgl.LngLatLike).addTo(this.mapa);

    this.marcadores.push({color,marker:nuevoMarcador, nombre: 'marcador '+(this.marcadores.length+1)}as Marcador);

  }

  centrarEnMarcador(marcador: Marcador){
    const marketCoordenadas = marcador.marker.getLngLat().toArray();
    if(!ArrayUtils.equal(this.coordenadas, marketCoordenadas)){
      this.mapa.flyTo({
        center: marketCoordenadas as unknown as mapboxgl.LngLat
      });
    }
  }
}

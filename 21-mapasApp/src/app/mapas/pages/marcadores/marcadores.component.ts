import { Component, OnInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { fromEvent } from 'rxjs';
import { ArrayUtils } from 'src/app/utils/ArrayUtils';


interface Marcador {
  marker: mapboxgl.Marker,
  color: string,
  nombre: string
}

interface MarcadorLocalStorage{
  coordenadas: number[],
  color: string,
  nombre: string
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements OnInit, OnDestroy {


  mapa!: mapboxgl.Map;
  currentZoom = 16;
  coordenadas: number[] = [-57.965599,-34.912307];

  marcadores: Marcador[] = [];

  ngOnInit(): void {
    this.mapa = new mapboxgl.Map({
      container: 'mapa-marcador', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.coordenadas as mapboxgl.LngLatLike, // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
    });

    const coordenada$ = fromEvent(this.mapa,'move');
    coordenada$.subscribe(()=>{
      this.coordenadas = this.mapa.getCenter().toArray();
    });

    // cargar copia marcadores
    this.marcadores = this.getMarcadoresLocalStorage();
    this.marcadores.forEach(mark => mark.marker.addTo(this.mapa));

  }
  ngOnDestroy(): void {
    this.guardarMarcadoresLocalStorage(this.marcadores);
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

  cambioTextoMarcador(){
    // guardar todo de nuevo
    this.guardarMarcadoresLocalStorage(this.marcadores);
  }

  guardarMarcadoresLocalStorage(marcadores: Marcador[]){
    const lista = [];
    for(const marcador of marcadores){
      const markSave = {
        color: marcador.color,
        nombre: marcador.nombre,
        coordenadas: marcador.marker.getLngLat().toArray()
      } as MarcadorLocalStorage;
      lista.push(markSave);
    }
    localStorage.setItem('marcadores',JSON.stringify(lista));
  }

  getMarcadoresLocalStorage():Marcador[]{
    const listaSave = JSON.parse(localStorage.getItem('marcadores') ?? '[]') as MarcadorLocalStorage[];
    const lista = [];
    for(const marcadorSave of listaSave){
      const marcador = {
        color: marcadorSave.color,
        nombre: marcadorSave.nombre,
        marker: new mapboxgl.Marker({draggable: true, color: marcadorSave.color}).setLngLat(marcadorSave.coordenadas as mapboxgl.LngLatLike)
      } as Marcador;
      lista.push(marcador);
    }
    return lista;
  }
}

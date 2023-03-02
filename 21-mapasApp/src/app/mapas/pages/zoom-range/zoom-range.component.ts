import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements OnInit {

  minRange= 10;
  maxRange = 20;
  currentZoom = 14;
  coordenadas: number[] = [-61.551315,-34.858458];

  mapa!: mapboxgl.Map;

  ngOnInit(): void {
    this.mapa = new mapboxgl.Map({
      container: 'mapa-zoom-range', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.coordenadas as mapboxgl.LngLatLike, // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
    });
    // this.mapa.scrollZoom.disable();
    this.mapa.on('zoomend', (e)=>{
      this.currentZoom = this.mapa.getZoom();
    });
    // forma tradicional
    // this.mapa.on('move',(e)=>{
    //   this.coordenadas = this.mapa.getCenter();
    // });
    //aplicando rxjs
    const coordenada$ = fromEvent(this.mapa,'move');
    coordenada$.pipe(debounceTime(300)).subscribe(()=>{
      this.coordenadas = this.mapa.getCenter().toArray();
    });


  }

  changeZoom(zoomObjective: string | number){
    console.log(zoomObjective);
    const zoom = Math.trunc(Number(zoomObjective));
    if(this.minRange<=zoom && zoom <=this.maxRange){
      this.currentZoom = zoom;
      this.mapa.flyTo({zoom:zoom});
    }
    if(this.minRange>zoom){
      this.mapa.flyTo({zoom:this.minRange});
    }
    if(this.maxRange < zoom){
      this.mapa.flyTo({zoom:this.maxRange});
    }
  }
}

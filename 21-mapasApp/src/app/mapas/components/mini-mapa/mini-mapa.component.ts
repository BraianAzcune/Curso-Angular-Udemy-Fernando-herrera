import { AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styleUrls: ['./mini-mapa.component.css']
})
export class MiniMapaComponent implements AfterViewInit {

  @Input() lngLat: [number,number]= [0,0];

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 16, // starting zoom
      interactive: false,
    });
    new mapboxgl.Marker().setLngLat(this.lngLat).addTo(this.mapa);
  }
}

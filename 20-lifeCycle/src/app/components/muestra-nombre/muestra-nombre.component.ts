import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-muestra-nombre',
  templateUrl: './muestra-nombre.component.html',
  styleUrls: ['./muestra-nombre.component.css']
})
export class MuestraNombreComponent implements OnInit, OnChanges{
  @Input() nombre = ""

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnchanges muestra component")
  }

  ngOnInit(): void {
  }

}

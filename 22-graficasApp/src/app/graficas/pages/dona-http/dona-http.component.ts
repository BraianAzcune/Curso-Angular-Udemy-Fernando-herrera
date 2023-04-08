import { Component, OnInit } from '@angular/core';
import { GraficasService } from '../../services/graficas.service';
import { CantidadProductosPorCategoria } from '../../models/producto';
import { ChartData, ChartType, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-dona-http',
  templateUrl: './dona-http.component.html',
  styleUrls: ['./dona-http.component.css']
})
export class DonaHttpComponent implements OnInit{

  cantidadDeProductosPorCategoria: CantidadProductosPorCategoria[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.cantidadDeProductosPorCategoria.map(c=>c.categoria),
    datasets: [
      { data: this.cantidadDeProductosPorCategoria.map(c=>c.cantidad) },

    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private graficaService: GraficasService){}

  ngOnInit(): void {
    this.graficaService.getEstadisticaProductosPorCategoria().subscribe((cantidadPorCategoria)=>{
      this.cantidadDeProductosPorCategoria = cantidadPorCategoria;
      this.doughnutChartData = {
        labels: this.cantidadDeProductosPorCategoria.map(c=>c.categoria),
        datasets: [
          { data: this.cantidadDeProductosPorCategoria.map(c=>c.cantidad) },

        ]
      };
    });
  }


  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
}

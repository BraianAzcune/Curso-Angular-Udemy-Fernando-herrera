import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
@Component({
  selector: 'app-barras-dobles',
  templateUrl: './barras-dobles.component.html',
  styleUrls: ['./barras-dobles.component.css']
})
export class BarrasDoblesComponent {
  nvidiaVsAmdGameData: ChartData<'bar'> = {
    labels: ['Fortnite', 'Apex Legends', 'Overwatch', 'Rainbow Six Siege', 'Call of Duty: Warzone'],
    datasets: [
      { data: [150, 140, 160, 155, 145], label: 'Nvidia', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
      { data: [145, 135, 155, 150, 140], label: 'AMD', backgroundColor: 'rgba(54, 162, 235, 0.5)' }
    ]
  };

  nvidiaVsAmdRenderTime: ChartData<'bar'> = {
    labels: ['Cinema4D', 'Blender', 'Adobe Premiere Pro', 'Adobe After Effects', 'Autodesk Maya'],
    datasets: [
      { data: [12, 12, 12, 13, 11], label: 'Nvidia', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
      { data: [11, 11, 11, 11, 15], label: 'AMD', backgroundColor: 'rgba(54, 162, 235, 0.5)' }
    ]
  };
}

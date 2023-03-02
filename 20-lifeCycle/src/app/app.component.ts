import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'lifeCycle';
  mostrar= true
  cont=0

  ngOnInit(): void {
    interval(1000).subscribe(()=>this.cont++);
  }
  show(){
    this.cont = 0;
    this.mostrar = !this.mostrar
  }
}

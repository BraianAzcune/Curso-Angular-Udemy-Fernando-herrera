import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription, interval, tap } from 'rxjs';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.css']
})
export class Pagina1Component
implements OnInit, OnChanges, DoCheck,
AfterContentInit, AfterContentChecked, AfterViewChecked,
AfterContentInit, OnDestroy {

  nombre=""
  
  constructor() {
    console.log("pagina1 constructor")
  }
  ngDoCheck(): void {
    console.log("pagina1 docheck")
  }
  ngAfterContentInit(): void {
    console.log("pagina1 aftercontentinit")
  }
  ngAfterContentChecked(): void {
    console.log("pagina1 aftercontentchecked")
  }
  ngAfterViewChecked(): void {
    console.log("pagina1 afterviewchecked")
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("pagina1 onchanges")
  }
  segundos = 0;
  segundos2 = 0;

  subscripcion$ !: Subscription
  ngOnInit(): void {
    console.log("pagina1 ngoninit")
    const numbers$ = interval(1000);
    this.subscripcion$= numbers$.pipe(tap(()=>console.log("hola")))
                                .subscribe(() => this.segundos++);
  }
  ngOnDestroy(): void {
    // si se comenta se seguiran mostrando los logs del tap
    this.subscripcion$.unsubscribe()
  }

  subscripciones$ = new Subscription()
  ngOnInit(): void {
    console.log("pagina1 ngoninit")
    const numbers$ = interval(1000)
    const numbers2$ = interval(2000)

    this.subscripciones$.add(numbers$.pipe(tap(()=>console.count("numbers1")))
                                      .subscribe(()=>this.segundos++))
    this.subscripciones$.add(numbers2$.pipe(tap(()=>console.count("numbers2")))
                                      .subscribe(()=>this.segundos2++))

  }
  ngOnDestroy(): void {
    // si se comenta, se seguira mostrando los logs del tap
    this.subscripciones$.unsubscribe()
  }


  saludar(){}
}

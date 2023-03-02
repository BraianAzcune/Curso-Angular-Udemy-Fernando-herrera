import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
})
export class PaisInputComponent implements OnInit {
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Input() placeholder: string = '';
  protected termino: string = '';
  private debouncer: Subject<string> = new Subject();

  ngOnInit(): void {
    // depende de teclaPresionada
    this.debouncer.pipe(debounceTime(500)).subscribe((valor) => {
      this.onDebounce.emit(valor);
    });
  }
  teclaPresionada(event: Event) {
    const valor = (<HTMLInputElement>event.target).value;
    this.debouncer.next(valor);
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }
}

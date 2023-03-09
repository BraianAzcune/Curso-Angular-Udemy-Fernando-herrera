import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-db-click-editable',
  templateUrl: './input-db-click-editable.component.html',
  styleUrls: ['./input-db-click-editable.component.css'],
})
export class InputDbClickEditableComponent {
  soloLectura= true;

  @Input() texto = '';
  @Output() textoChange = new EventEmitter<string>();

  changeTexto(event: Event){
    this.texto = (event.target as HTMLInputElement).value;
    this.textoChange.emit(this.texto);
  }

  changeEditable(event: Event){
    this.soloLectura = false;
    (event.target as HTMLInputElement).select();
  }
}

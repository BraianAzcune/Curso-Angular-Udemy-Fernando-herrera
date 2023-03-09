import { Component, EventEmitter, Input,  OnInit,  Output } from '@angular/core';

@Component({
  selector: 'app-input-db-click-editable',
  templateUrl: './input-db-click-editable.component.html',
  styleUrls: ['./input-db-click-editable.component.css'],
})
export class InputDbClickEditableComponent implements OnInit{
  soloLectura= true;
  textoOld = '';
  @Input() texto = '';
  @Output() textoChange = new EventEmitter<string>();
  @Output() textoChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.textoOld = this.texto;
  }

  changeTexto(event: Event){
    this.texto = (event.target as HTMLInputElement).value;
    this.textoChange.emit(this.texto);
  }

  changeEditable(event: Event){
    this.soloLectura = false;
    (event.target as HTMLInputElement).select();
  }

  changeSoloLectura(){
    this.soloLectura =true;
    if(this.texto != this.textoOld){
      this.textoChanged.emit(this.texto);
    }
    this.textoOld = this.texto;
  }


}

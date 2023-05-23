import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appCustomLabel]'
})
export class CustomLabelDirective {

  constructor(private el: ElementRef<HTMLElement>) { }

  @Input() set errors(v: ValidationErrors | null | undefined) {
    if (v == null || v == undefined) {
      this.el.nativeElement.innerHTML = "";
      return;
    }
    const errors = Object.keys(v);

    let mensajeExtra = "";
    if (errors.length > 1) {
      if (errors.length < 3) {
        mensajeExtra = ` (1 error mas)`;
      } else {
        mensajeExtra = ` (${errors.length} errores mas)`;
      }
    }

    if (errors[0] == "required") {
      this.el.nativeElement.innerHTML = "Este campo es requerido" + mensajeExtra;
      return;
    }
    if (errors[0] == "minlength") {
      this.el.nativeElement.innerHTML = `Este campo requiere minimo ${v[errors[0]].requiredLength} caracteres` + mensajeExtra;
      return;
    }
    if (errors[0] == "email") {
      this.el.nativeElement.innerHTML = "Este campo debe ser un email" + mensajeExtra;
      return;
    }

  }



}

import { Directive, HostBinding, Input } from "@angular/core";

/**
 *  Esta directiva se encarga de ocultar un componente si el valor pasado es falso,
 * al ocultarlo se mantiene en el DOM y sigue ocupando el espacio que tiene.
 *
 * si el valor enviado es nulo, se mostrara.
 *
 * ejemplo uso=
 * <h2 [appMostrar]="false">No me veo, pero ocupo mi espacio.</h2>
 *
 *
 */
@Directive({
  selector: "[appMostrar]"
})
export class MostrarDirective{

  private _mostrar  = true;
  @Input() set appMostrar(v: boolean | null){
    if(v===null){
      v = true;
    }
    this._mostrar = v;
  }

  @HostBinding("style.visibility")
  get visibilidadElemento(){
    return this._mostrar ? "visible": "hidden";
  }

}

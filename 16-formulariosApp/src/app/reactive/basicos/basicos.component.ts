import { Component} from "@angular/core";
import { FormBuilder,  FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-basicos",
  templateUrl: "./basicos.component.html",
  styles: [
  ]
})
export class BasicosComponent  {

  // formulario : FormGroup = new FormGroup({
  //   nombre: new FormControl("RTX 4060"),
  //   precio: new FormControl(0),
  //   existencias: new FormControl(0),
  // });
  formulario: FormGroup = this.fb.group({
    nombre : ["",[Validators.required, Validators.minLength(3)]],
    precio : [0, [Validators.required, Validators.min(0)]],
    existencias : [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder){}


  campoEsNoValido(campo:string){

    if(this.formulario.controls[campo] == undefined){
      throw new Error("el valor campo, no existe en el formulario="+campo);
    }
    return (this.formulario.controls[campo].touched)
            &&(this.formulario.controls[campo].errors != undefined);
  }

  guardar(){
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }
    this.formulario.reset();
  }
}

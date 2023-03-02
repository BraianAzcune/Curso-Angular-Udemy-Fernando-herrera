import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-dinamicos",
  templateUrl: "./dinamicos.component.html",
  styles: [
  ]
})
export class DinamicosComponent {
  constructor(private fb: FormBuilder) { }

  formulario: FormGroup = this.fb.group({
    nombre: ["",[Validators.required]],
    favoritos: this.fb.array([
      ["Minecraft", Validators.required],
      ["OSU!", Validators.required]
    ],Validators.required)
  });

  get favoritosArr(){
    return this.formulario.get("favoritos") as FormArray;
  }

  nuevoFavorito : FormControl = this.fb.control("",Validators.required);


  esCampoInvalido(campo:string){
    if(this.formulario.controls[campo] == undefined){
      throw new Error("el valor campo, no existe en el formulario="+campo);
    }
    return (this.formulario.controls[campo].touched)
            &&(this.formulario.controls[campo].errors != undefined);
  }

  agregarFavorito(){
    if(this.nuevoFavorito.invalid) return;
    this.favoritosArr.push(new FormControl(this.nuevoFavorito.value, Validators.required));
    this.nuevoFavorito.reset();
  }

  borrar(idFormControl:number){
    this.favoritosArr.removeAt(idFormControl);
  }

  guardar(){
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }
    alert("guardado");
  }

}

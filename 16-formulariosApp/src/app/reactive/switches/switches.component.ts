import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-switches",
  templateUrl: "./switches.component.html",
  styles: [
  ]
})
export class SwitchesComponent implements OnInit{
  constructor(private fb: FormBuilder) { }

  persona = {
    genero: "F",
    notificaciones: true
  };

  formulario: FormGroup = this.fb.group({
    genero: this.fb.control("M",Validators.required),
    notificaciones: this.fb.control(true,Validators.required),
    condiciones: this.fb.control(false, Validators.requiredTrue)
  });

  ngOnInit(): void {
    this.formulario.reset(this.persona);

    // ! A24, si queres que la persona se cambie junto con el formulario al mismo tiempo MIRAR A23
    this.formulario.valueChanges.subscribe((valor)=>{
      const persona = {...valor};
      delete valor.condiciones;
      this.persona = valor;
    });
  }

  guardar(){
    // ! A23, mirar A24
    const valor={...this.formulario.value};
    delete valor.condiciones;
    this.persona = valor;
  }
}

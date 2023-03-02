import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmailValidatorService } from "src/app/shared/validators/email-validator.service";
import { ValidatorService } from "src/app/shared/validators/validator.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {

  mostrarPassword = false;

  get emailErrorMsg(){
    const caso = Object.keys(this.formulario.get("email")?.errors ?? {})[0];
    switch(caso){
    case "":
      return "";
    case "required":
      return "El email es requerido";
    case "pattern":
      return "El correo electrónico no es válido";
    case "unique":
      return "Ya existe un usuario con este email";
    default:
      return "Error desconocido en el email";
    }
  }

  constructor(private fb: FormBuilder, private vS: ValidatorService, private emailValidator: EmailValidatorService) { }


  formulario: FormGroup = this.fb.group({
    nombre: ["",[Validators.required, this.vS.nombreYApellido]],
    email: ["",[Validators.required, this.vS.email], [this.emailValidator]],
    username: ["",[Validators.required]],
    password: ["",[Validators.required, Validators.minLength(6)]],
    passwordConfirm: ["",[Validators.required]],
  },
  {
    validators: [
      this.vS.camposIguales("password","passwordConfirm","passwordConfirm"),
    ]
  });

  ngOnInit(): void {
    this.formulario.reset({nombre:"Braian Azcune"});
  }


  mostrarWarningCampoInvalido(campo:string){
    const c = this.formulario.get(campo);
    if(!c){
      console.error("el campo no existe="+campo);
      return false;
    }
    return c.touched && c.invalid;
  }



  submitFormulario(){
    this.formulario.markAllAsTouched();
    if(this.formulario.invalid){
      return;
    }
  }
}

import { Injectable } from "@angular/core";
import { FormControl, ValidationErrors, Validators, AbstractControl } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class ValidatorService {

  private regexNombreApellido = /^[a-zA-Záéíóú]{3,30} [a-zA-Záéíóú]{3,30}$/i;
  private regexNombreEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  public nombreYApellido = Validators.pattern(this.regexNombreApellido);
  public email = Validators.pattern(this.regexNombreEmail);

  noPuedeSerStride(control:FormControl):ValidationErrors | null{
    const valor:string = control.value?.trim().toLowerCase();
    if(valor == "stride"){
      return {
        noStride: true
      };
    }
    return null;
  }

  camposIguales(c1:string, c2:string, cToSetError:string){
    return function(formGroup: AbstractControl):ValidationErrors | null{
      const valor1: string = formGroup.get(c1)?.value;
      const valor2: string = formGroup.get(c2)?.value;

      const rta = valor1 === valor2 ? null : {camposIguales:true};

      if(cToSetError){
        formGroup.get(cToSetError)?.setErrors(rta);
        return null;
      }else{
        return rta;
      }
    };
  }

}

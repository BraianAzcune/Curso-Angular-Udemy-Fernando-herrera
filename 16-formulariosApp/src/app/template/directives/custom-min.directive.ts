import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: "[ejercicioMaxDirective][ngModel]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EjercicioMaxDirective,
      multi: true,
    }
  ]
})
export class EjercicioMaxDirective implements Validator{
  @Input() ejercicioMaxDirective!: number;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if(control.value > this.ejercicioMaxDirective) return {"customMax":true};
    return null;
  }

}

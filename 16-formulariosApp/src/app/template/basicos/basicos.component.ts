import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";


type estiloValido = "visible" | "hidden";

@Component({
  selector: "app-basicos",
  templateUrl: "./basicos.component.html",
  styles: [
  ]
})
export class BasicosComponent {

  @ViewChild("productForm") productForm!: NgForm;

  initForm = {
    producto: "",
    precio: 0,
    existencias: 0
  };

  nombreValido(): estiloValido{
    return this.productForm?.controls["producto"]?.touched &&
          this.productForm?.controls["producto"]?.invalid ? "visible" : "hidden";
  }

  precioValido() : estiloValido {
    return this.productForm?.controls["precio"]?.touched &&
          this.productForm?.controls["precio"]?.value <= 0 ? "visible" : "hidden";
  }

  guardar(){
    console.log(this.productForm.controls);
    this.productForm.resetForm({
      precio: 0,
      existencias: 0
    });
  }

}

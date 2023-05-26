import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {



  // constructor(private fb: FormBuilder){}
  private fb = inject(FormBuilder);

  public formulario: FormGroup = this.fb.group({
    nombre: ["", [Validators.required, Validators.minLength(6), Validators.email]]
  });

  public color: string = "green";

  changeColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.color = color;
  }
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TemplateRoutingModule } from "./template-routing.module";
import { BasicosComponent } from "./basicos/basicos.component";
import { DinamicosComponent } from "./dinamicos/dinamicos.component";
import { SwitchesComponent } from "./switches/switches.component";
import { FormsModule } from "@angular/forms";
import { EjercicioMaxDirective } from "./directives/custom-min.directive";
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    BasicosComponent,
    DinamicosComponent,
    SwitchesComponent,
    EjercicioMaxDirective
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class TemplateModule { }

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { RouterModule } from "@angular/router";
import { MostrarDirective } from "./mostrar.directive";



@NgModule({
  declarations: [
    SideMenuComponent,
    MostrarDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SideMenuComponent,MostrarDirective]
})
export class SharedModule { }

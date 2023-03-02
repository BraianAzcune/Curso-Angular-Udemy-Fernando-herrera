import { Component, OnInit } from "@angular/core";

interface Persona {
  nombre: string,
  favoritos: Favorito[]
}

interface Favorito {
  id: number,
  nombre: string
}

@Component({
  selector: "app-dinamicos",
  templateUrl: "./dinamicos.component.html",
  styles: [
  ]
})
export class DinamicosComponent {

  persona:Persona = {
    nombre: "Fernando",
    favoritos: [
      {
        id: 1,
        nombre: "Metal Gear"
      },
      {
        id: 2,
        nombre: "Minecraft"
      }
    ]
  };

  nuevoJuegoFav= "";


  guardar(){
    console.log("formulario posteado");
  }

  eliminarFav(i: number){
    this.persona.favoritos.splice(i,1);
  }

  agregarFav(){
    this.persona.favoritos.push({id: (this.persona.favoritos.at(-1)?.id ?? -1) + 1, nombre: this.nuevoJuegoFav});
    this.nuevoJuegoFav = "";
  }
}

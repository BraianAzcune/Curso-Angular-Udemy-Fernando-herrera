import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CantidadProductosPorCategoria, Producto } from '../models/producto';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraficasService {

  constructor(private http: HttpClient) { }

  getProductos():Observable<Producto[]>{
    return this.http.get<{products:Producto[]}>('https://dummyjson.com/products').pipe(map(rta=>rta.products));
  }

  getEstadisticaProductosPorCategoria(): Observable<CantidadProductosPorCategoria[]>{
    return this.getProductos().pipe(
      map((productos)=>{
        const cantidadPorCategoria: CantidadProductosPorCategoria[] = [];
        productos.forEach(p=>{
          const cantCat  = cantidadPorCategoria.find(c=>c.categoria == p.category);
          if(cantCat != undefined){
            cantCat.cantidad ++;
          }else{
            cantidadPorCategoria.push({
              cantidad: 1,
              categoria: p.category
            });
          }
        });
        return cantidadPorCategoria;
      })
    );
  }
}

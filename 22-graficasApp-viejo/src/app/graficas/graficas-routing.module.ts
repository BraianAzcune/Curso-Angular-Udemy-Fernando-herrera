import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarrasComponent } from './pages/barras/barras.component';
import { BarrasDoblesComponent } from './pages/barras-dobles/barras-dobles.component';
import { DonaComponent } from './pages/dona/dona.component';
import { DonaHttpComponent } from './pages/dona-http/dona-http.component';
import { MenuComponent, MenuItem } from './shared/menu/menu.component';

const routes: Routes = [
  {
    path: 'graficas',
    component: MenuComponent,
    children: [
      {
        path: 'barra',
        component: BarrasComponent
      },
      {
        path: 'barra-doble',
        component: BarrasDoblesComponent
      },
      {
        path: 'dona',
        component: DonaComponent
      },
      {
        path: 'dona-http',
        component: DonaHttpComponent
      },
      {
        path: '**',
        redirectTo: 'barra'
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'graficas'
  },
];

function kebabToNormal(str:string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, function(l) {
    return l.toUpperCase();
  });
}

export const rutas:MenuItem[] = routes[0].children?.filter(r => r.path != '**').map(r=>{
  return {ruta:r.path ?? '', texto: kebabToNormal(r.path ?? '')};
}) ?? [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficasRoutingModule { }

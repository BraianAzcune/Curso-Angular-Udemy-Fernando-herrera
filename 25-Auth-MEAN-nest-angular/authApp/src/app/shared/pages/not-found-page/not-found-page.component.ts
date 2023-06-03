import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  regresar(){
    this.location.back();
  }
  paginaInicio(){
    this.router.navigateByUrl('/');
  }
}

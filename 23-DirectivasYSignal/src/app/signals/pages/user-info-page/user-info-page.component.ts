import { Component, OnInit, inject, signal } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { UserResponse } from '../../interfaces/user-request.interface';
import { distinct, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {
  userService = inject(UserServiceService);
  id = signal(2);
  currentUser = signal<UserResponse | undefined>(undefined);
  ngOnInit(): void {
    this.loadUser(this.id());
  }

  loadUser(id: number) {
    // if (id < 1) return;

    this.id.set(id);
    this.userService.getUserById(this.id()).pipe(
    ).subscribe({
      next: (user) => {
        console.log("usuario", user)
        this.currentUser.set(user)
      },
      error: (err: HttpErrorResponse) => {
        if (err?.status == 404) {
          this.currentUser.set(undefined);
        } else {
          alert("Error inesperado al cargar usuario")
        }
      }
    });
  }
}

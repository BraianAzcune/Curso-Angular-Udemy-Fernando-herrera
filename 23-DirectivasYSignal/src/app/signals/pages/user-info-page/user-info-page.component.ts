import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
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
  nombreCompleto = computed(() => this.currentUser()?.data.first_name + " " + this.currentUser()?.data.last_name)
  ngOnInit(): void {
    this.loadUser(this.id());
  }
  /**
   * En cuanto se utiliza un signal, esta fucnion se ejecutara cada vez que el signal cambie
   */
  userChanged = effect(() => {
    console.log("userChange", this.currentUser());
  });

  loadUser(id: number) {
    this.id.set(id);
    this.userService.getUserById(this.id()).pipe(
    ).subscribe({
      next: (user) => {
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

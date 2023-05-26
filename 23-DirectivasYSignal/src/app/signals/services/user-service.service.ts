import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserResponse } from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private http = inject(HttpClient);

  getUserById(id: number) {
    return this.http.get<UserResponse>("https://reqres.in/api/users/" + id);
  }
}

import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = signal<string>('http://localhost:3000/users');

  private readonly http = inject(HttpClient);

  createUser(user: User): Observable<User> {
    const url = this.baseUrl();

    return this.http.post<User>(url, user).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err.error))
    );
  }

  findAllUsers(): Observable<User[]> {
    const url = this.baseUrl();

    return this.http.get<User[]>(url).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err.error))
    );
  }

  findUser(id: number) {
    console.log('findUser', id);
  }

  updateUser(id: number, user: User) {
    console.log('updateUser', id, user);
  }

  deleteUser(id: number) {
    console.log('deleteUser', id);
  }
}

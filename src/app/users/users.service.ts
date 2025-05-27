import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = signal<string>(`${environment.url}/users`);

  private readonly http = inject(HttpClient);

  // Método para crear un nuevo usuario
  createUser(user: User): Observable<User> {
    const url = this.baseUrl();

    return this.http.post<User>(url, user).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err.error)),
    );
  }

  // Método para obtener todos los usuarios
  findAllUsers(): Observable<User[]> {
    const url = this.baseUrl();

    return this.http.get<User[]>(url).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err.error)),
    );
  }

  // Método para obtener un usuario por su ID
  findUser(id: number): Observable<User> {
    const url = this.baseUrl() + `/${id}`;

    return this.http.get<User>(url).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err.error)),
    );
  }

  // Método para actualizar un usuario
  updateUser(id: number, user: User): Observable<User> {
    const url = this.baseUrl() + `/${id}`;

    return this.http.put<User>(url, user).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err.error)),
    );
  }

  // Método para eliminar un usuario
  deleteUser(id: number): Observable<void> {
    const url = this.baseUrl() + `/${id}`;

    return this.http.delete<void>(url).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err.error)),
    );
  }
}

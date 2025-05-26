import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Apartment } from '../../interfaces/apartment';

@Injectable({
  providedIn: 'root',
})
export class ApartmentsService {
  baseUrl = signal<string>(`http://localhost:${environment.port}/apartments`);

  private readonly http = inject(HttpClient);

  createApartment(apartment: Apartment): Observable<Apartment> {
    const url = this.baseUrl();

    return this.http.post<Apartment>(url, apartment).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err.error))
    );
  }

  findAllApartments(): Observable<Apartment[]> {
    const url = this.baseUrl();

    return this.http.get<Apartment[]>(url).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err.error))
    );
  }

  findApartment(id: number): Observable<Apartment> {
    const url = this.baseUrl() + `/${id}`;

    return this.http.get<Apartment>(url).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err.error))
    );
  }

  editApartment(id: number, apartment: Apartment): Observable<Apartment> {
    const url = this.baseUrl() + `/${id}`;

    return this.http.put<Apartment>(url, apartment).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err.error))
    );
  }

  deleteApartment(id: number): Observable<void> {
    const url = this.baseUrl() + `/${id}`;

    return this.http.delete<void>(url).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err.error))
    );
  }
}

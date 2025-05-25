import { inject, Injectable, signal } from '@angular/core';
import { Apartment } from '../../interfaces/apartment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApartmentsService {
  baseUrl = signal<string>('http://localhost:3000');

  private readonly http = inject(HttpClient);

  createApartment(apartment: Apartment) {
    console.log('createApartment', apartment);
  }

  findAllApartments(): Observable<Apartment[]> {
    const url = this.baseUrl() + `/apartment`;

    return this.http.get<Apartment[]>(url).pipe(
      map((resp) => resp),
      catchError((err) => throwError(() => err.error))
    );
  }

  findApartment(id: number) {
    console.log('findApartment', id);
  }

  updateApartment(id: number, apartment: Apartment) {
    console.log('updateApartment', id, apartment);
  }

  deleteApartment(id: number) {
    console.log('deleteApartment', id);
  }
}

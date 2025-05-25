import { Injectable } from '@angular/core';
import { Apartment } from '../../interfaces/apartment';

@Injectable({
  providedIn: 'root',
})
export class ApartmentsService {
  createApartment(apartment: Apartment) {
    console.log('createApartment', apartment);
  }

  findAllApartments() {
    console.log('findAllApartments');
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

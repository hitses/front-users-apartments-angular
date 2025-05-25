import { Component, inject, signal } from '@angular/core';
import { ApartmentsService } from '../../apartments.service';
import { Apartment } from '../../../../interfaces/apartment';
import { BackButtonComponent } from '../../../common/components/back-button/back-button.component';

@Component({
  selector: 'app-new',
  imports: [BackButtonComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export default class NewComponent {
  apartment = signal<Apartment>({
    rooms: 0,
    bathrooms: 0,
    area: 0,
    floor: 0,
    description: '',
    price: 0,
  });

  private readonly apartmentsService = inject(ApartmentsService);

  createApartment() {
    this.apartmentsService.createApartment(this.apartment());
  }
}

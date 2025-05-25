import { Component, inject, signal } from '@angular/core';
import { Apartment } from '../../../../interfaces/apartment';
import { ActivatedRoute } from '@angular/router';
import { ApartmentsService } from '../../apartments.service';
import { BackButtonComponent } from '../../../common/components/back-button/back-button.component';

@Component({
  selector: 'app-get-apartment',
  imports: [BackButtonComponent],
  templateUrl: './get-apartment.component.html',
  styleUrl: './get-apartment.component.scss',
})
export default class GetApartmentComponent {
  apartmentId = signal<number>(0);
  apartment = signal<Apartment>({
    rooms: 0,
    bathrooms: 0,
    area: 0,
    floor: 0,
    description: '',
    price: 0,
  });

  private readonly route = inject(ActivatedRoute);
  private readonly apartmentsService = inject(ApartmentsService);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.apartmentId.set(params['id']);
    });
  }

  getApartment() {
    this.apartmentsService.findApartment(this.apartmentId());
  }
}

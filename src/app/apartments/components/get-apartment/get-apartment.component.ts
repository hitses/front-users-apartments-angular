import { Component, inject, signal } from '@angular/core';
import { Apartment } from '../../../../interfaces/apartment';
import { ActivatedRoute } from '@angular/router';
import { ApartmentsService } from '../../apartments.service';
import { BackButtonComponent } from '../../../common/components/back-button/back-button.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-get-apartment',
  imports: [BackButtonComponent, JsonPipe],
  templateUrl: './get-apartment.component.html',
  styleUrl: './get-apartment.component.scss',
})
export default class GetApartmentComponent {
  apartmentId = signal<number>(0);
  apartment = signal<Apartment>({} as Apartment);

  private readonly route = inject(ActivatedRoute);
  private readonly apartmentsService = inject(ApartmentsService);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.apartmentId.set(params['id']);
    });

    this.getApartment();
  }

  getApartment() {
    this.apartmentsService.findApartment(this.apartmentId()).subscribe({
      next: (apartment) => this.apartment.set(apartment),
      error: (err) => console.log('ERROR', err),
    });
  }
}

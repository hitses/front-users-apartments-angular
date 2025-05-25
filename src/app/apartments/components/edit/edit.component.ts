import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apartment } from '../../../../interfaces/apartment';
import { ApartmentsService } from '../../apartments.service';
import { BackButtonComponent } from '../../../common/back-button/back-button.component';

@Component({
  selector: 'app-edit',
  imports: [BackButtonComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export default class EditComponent {
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

  updateApartment() {
    this.apartmentsService.updateApartment(
      this.apartmentId(),
      this.apartment()
    );
  }
}

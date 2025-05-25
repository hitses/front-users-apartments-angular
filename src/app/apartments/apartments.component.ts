import { Component, inject } from '@angular/core';
import { ApartmentsService } from './apartments.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-apartments',
  imports: [RouterLink],
  templateUrl: './apartments.component.html',
  styleUrl: './apartments.component.scss',
})
export default class ApartmentsComponent {
  private apartmentsService = inject(ApartmentsService);

  ngOnInit() {
    this.findAllApartments();
  }

  findAllApartments() {
    this.apartmentsService.findAllApartments();
  }

  deleteApartment(id: number) {
    this.apartmentsService.deleteApartment(id);
  }
}

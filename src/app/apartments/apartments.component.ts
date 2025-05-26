import { Component, inject, signal } from '@angular/core';
import { ApartmentsService } from './apartments.service';
import { Apartment } from '../../interfaces/apartment';
import { TableColumn } from '../../interfaces/table-column';
import { DynamicTableComponent } from '../common/components/dynamic-table/dynamic-table.component';
import { PageHeadComponent } from '../common/components/page-head/page-head.component';
import { ConfirmationService } from '../common/services/confirmation-service.service';

@Component({
  selector: 'app-apartments',
  imports: [DynamicTableComponent, PageHeadComponent],
  templateUrl: './apartments.component.html',
  styleUrl: './apartments.component.scss',
})
export default class ApartmentsComponent {
  apartments = signal<Apartment[]>([]);
  apartmentColumns = signal<TableColumn[]>([
    { field: 'id', header: 'ID' },
    { field: 'rooms', header: 'Rooms' },
    { field: 'price', header: 'Price' },
  ]);

  private apartmentsService = inject(ApartmentsService);
  private readonly confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.findAllApartments();
  }

  findAllApartments() {
    this.apartmentsService.findAllApartments();
    this.apartmentsService.findAllApartments().subscribe((apartments) => {
      this.apartments.set(apartments);
    });
  }

  deleteApartment(id: number): void {
    this.confirmationService.confirmAndDelete(
      id,
      'Apartment',
      (apartmentId) => this.apartmentsService.deleteApartment(apartmentId),
      () => this.findAllApartments()
    );
  }
}

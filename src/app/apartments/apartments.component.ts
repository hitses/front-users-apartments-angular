import { Component, inject, signal } from '@angular/core';
import { ApartmentsService } from './apartments.service';
import { Apartment } from '../../interfaces/apartment';
import { TableColumn } from '../../interfaces/table-column';
import { DynamicTableComponent } from '../common/components/dynamic-table/dynamic-table.component';
import { PageHeadComponent } from '../common/components/page-head/page-head.component';

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
    { field: 'rooms', header: 'Habitaciones' },
    { field: 'price', header: 'Precio' },
  ]);

  private apartmentsService = inject(ApartmentsService);

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
    this.apartmentsService.deleteApartment(id).subscribe({
      next: () => this.findAllApartments(),
      error: (err) => console.log('ERROR', err),
    });
  }
}

import { Component, inject } from '@angular/core';
import { ApartmentsService } from './apartments.service';
import { RouterLink } from '@angular/router';
import { ApartmentTable } from '../../interfaces/apartment';
import { TableColumn } from '../../interfaces/table-column';
import { DynamicTableComponent } from '../common/components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-apartments',
  imports: [RouterLink, DynamicTableComponent],
  templateUrl: './apartments.component.html',
  styleUrl: './apartments.component.scss',
})
export default class ApartmentsComponent {
  apartments: ApartmentTable[] = [
    { id: 101, rooms: 3, price: 150000 },
    { id: 102, rooms: 2, price: 95000 },
    { id: 103, rooms: 4, price: 210000 },
  ];

  apartmentColumns: TableColumn[] = [
    { field: 'id', header: 'ID' },
    { field: 'rooms', header: 'Habitaciones' },
    { field: 'price', header: 'Precio' },
  ];

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

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
})
export default class ApartmentsComponent {
  // Propiedades del componente
  apartments = signal<Apartment[]>([]);
  // Columnas para la tabla dinámica
  apartmentColumns = signal<TableColumn[]>([
    { field: 'id', header: 'ID' },
    { field: 'rooms', header: 'Rooms' },
    {
      field: 'price',
      header: 'Price',
      pipe: 'currency',
      pipeArgs: ['EUR', 'symbol', '1.2-2'],
    },
  ]);

  // Inyección de dependencias (no se usa el constructor)
  private apartmentsService = inject(ApartmentsService);
  private readonly confirmationService = inject(ConfirmationService);

  // Se obtienen todos los apartamentos al inicializar el componente, no al momento de su construcción
  ngOnInit() {
    this.findAllApartments();
  }

  // Se obtienen todos los apartamentos y se actualiza la propiedad 'apartments' con los datos obtenidos
  findAllApartments() {
    this.apartmentsService.findAllApartments();
    this.apartmentsService.findAllApartments().subscribe((apartments) => {
      this.apartments.set(apartments);
    });
  }

  // Método para eliminar un apartamento y actualizar la propiedad 'apartments' con los datos obtenidos llamando al servicio de apartamentos
  deleteApartment(id: number): void {
    this.confirmationService.confirmAndDelete(
      id,
      'Apartment',
      (apartmentId) => this.apartmentsService.deleteApartment(apartmentId),
      () => this.findAllApartments(),
    );
  }
}

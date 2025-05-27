import { Component, inject, signal } from '@angular/core';
import { Apartment } from '../../../../interfaces/apartment';
import { ActivatedRoute } from '@angular/router';
import { ApartmentsService } from '../../apartments.service';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { FormHeadComponent } from '../../../common/components/form-head/form-head.component';

@Component({
  selector: 'app-get-apartment',
  imports: [FormHeadComponent, TitleCasePipe, CurrencyPipe, DatePipe],
  templateUrl: './get-apartment.component.html',
})
export default class GetApartmentComponent {
  // Propiedades del componente
  apartmentId = signal<number>(0);
  apartment = signal<Apartment>({} as Apartment);

  // Inyección de dependencias (no se usa el constructor)
  private readonly route = inject(ActivatedRoute);
  private readonly apartmentsService = inject(ApartmentsService);

  // Se obtiene el ID del apartamento desde la ruta y se carga el apartamento al inicializar el componente
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.apartmentId.set(params['id']);

      this.getApartment();
    });
  }

  // Se obtiene el apartamento usando el servicio de apartamentos
  getApartment() {
    this.apartmentsService.findApartment(this.apartmentId()).subscribe({
      next: (apartment) => this.apartment.set(apartment),
      error: (err) => console.log('ERROR', err),
    });
  }
}

import { Component, inject, signal } from '@angular/core';
import { ApartmentsService } from '../../apartments.service';
import { Apartment } from '../../../../interfaces/apartment';
import { BackButtonComponent } from '../../../common/components/back-button/back-button.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { apartmentForm } from '../../forms/apartment';
import { isValidField } from '../../../common/utils/form-validation';

@Component({
  selector: 'app-new',
  imports: [BackButtonComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export default class NewComponent {
  apartment = signal<Apartment>({} as Apartment);

  public validField = isValidField;

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly apartmentsService = inject(ApartmentsService);

  ngOnInit() {
    this.apartmentForm.reset();
  }

  apartmentForm: FormGroup = this.fb.group(apartmentForm);

  createApartment() {
    this.apartmentsService.createApartment(this.apartment());
  }
}

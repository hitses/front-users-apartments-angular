import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apartment } from '../../../../interfaces/apartment';
import { ApartmentsService } from '../../apartments.service';
import { BackButtonComponent } from '../../../common/components/back-button/back-button.component';
import {
  isValidField,
  markAllFormFieldsAsTouched,
} from '../../../common/utils/form-validation';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  apartmentFields,
  apartmentFormValidations,
} from '../../forms/apartment';
import { DynamicFormComponent } from '../../../common/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-edit',
  imports: [BackButtonComponent, DynamicFormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export default class EditComponent {
  public formFields = apartmentFields;
  public validField = isValidField;

  apartmentId = signal<number>(0);

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly apartmentsService = inject(ApartmentsService);

  constructor() {
    this.apartmentForm = this.fb.group(apartmentFormValidations);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.apartmentId.set(params['id']);
      this.getApartment();
    });
  }

  apartmentForm: FormGroup;

  getApartment() {
    this.apartmentsService.findApartment(this.apartmentId()).subscribe({
      next: (apartment) => this.apartmentForm.patchValue(apartment),
      error: (err) => console.log('ERROR', err),
    });
  }

  editApartment() {
    if (this.apartmentForm.invalid) {
      markAllFormFieldsAsTouched(this.apartmentForm);

      return;
    }

    this.apartmentsService
      .editApartment(this.apartmentId(), this.apartmentForm.value)
      .subscribe({
        next: () => this.router.navigate(['/apartments']),
        // TODO: mostrar un mensaje de error
        error: (err) => console.log('ERROR', err),
      });
  }
}

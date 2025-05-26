import { Component, inject } from '@angular/core';
import { ApartmentsService } from '../../apartments.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  apartmentFields,
  apartmentFormValidations,
} from '../../forms/apartment';
import {
  isValidField,
  markAllFormFieldsAsTouched,
} from '../../../common/utils/form-validation';
import { DynamicFormComponent } from '../../../common/components/dynamic-form/dynamic-form.component';
import { FormHeadComponent } from '../../../common/components/form-head/form-head.component';

@Component({
  selector: 'app-new',
  imports: [DynamicFormComponent, FormHeadComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export default class NewComponent {
  public formFields = apartmentFields;
  public validField = isValidField;

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly apartmentsService = inject(ApartmentsService);

  ngOnInit() {
    this.apartmentForm.reset();
  }

  apartmentForm: FormGroup = this.fb.group(apartmentFormValidations);

  createApartment() {
    if (this.apartmentForm.invalid) {
      markAllFormFieldsAsTouched(this.apartmentForm);

      return;
    }

    this.apartmentsService.createApartment(this.apartmentForm.value).subscribe({
      next: () => this.router.navigate(['/apartments']),
      // TODO: mostrar un mensaje de error
      error: (err) => console.log('ERROR', err),
    });
  }
}

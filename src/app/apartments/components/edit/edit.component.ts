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
import { apartmentForm } from '../../forms/apartment';

@Component({
  selector: 'app-edit',
  imports: [BackButtonComponent, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export default class EditComponent {
  apartmentId = signal<number>(0);
  apartment = signal<Apartment>({} as Apartment);

  public validField = isValidField;

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly apartmentsService = inject(ApartmentsService);

  constructor() {
    this.apartmentForm = this.fb.group(apartmentForm);

    this.apartmentForm.removeControl('password');
    this.apartmentForm.removeControl('confirmPassword');
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.apartmentId.set(params['id']);
    });

    this.getApartment();
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

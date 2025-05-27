import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApartmentsService } from '../../apartments.service';
import {
  isValidField,
  markAllFormFieldsAsTouched,
} from '../../../common/utils/form-validation';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  apartmentFields,
  apartmentFormValidations,
} from '../../forms/apartment';
import { DynamicFormComponent } from '../../../common/components/dynamic-form/dynamic-form.component';
import { FormHeadComponent } from '../../../common/components/form-head/form-head.component';

@Component({
  selector: 'app-edit',
  imports: [DynamicFormComponent, FormHeadComponent],
  templateUrl: './edit.component.html',
})
export default class EditComponent {
  // Propiedades del componente
  public formFields = apartmentFields;
  public validField = isValidField;

  apartmentId = signal<number>(0);

  // Inyección de dependencias (no se usa el constructor)
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly apartmentsService = inject(ApartmentsService);

  // Se inicializa el formulario reactivo para editar un apartamento
  constructor() {
    this.apartmentForm = this.fb.group(apartmentFormValidations);
  }

  // Se obtiene el ID del apartamento desde la ruta y se carga el apartamento al inicializar el componente
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.apartmentId.set(params['id']);

      this.getApartment();
    });
  }

  // Formulario reactivo para editar un apartamento
  apartmentForm: FormGroup;

  // Se obtiene el apartamento usando el servicio de apartamentos
  getApartment() {
    this.apartmentsService.findApartment(this.apartmentId()).subscribe({
      next: (apartment) => this.apartmentForm.patchValue(apartment),
      error: (err) => console.log('ERROR', err),
    });
  }

  // Se llama al servicio de apartamentos para editar el apartamento
  editApartment() {
    // Si el formulario, por alguna razón que se escape al control del desarrollador, no es válido, se marcan todos los campos como "tocados" para que se muestren errores en los campos incorrectos, aunque el botón de editar no se active hasta que el formulario sea válido
    if (this.apartmentForm.invalid) {
      markAllFormFieldsAsTouched(this.apartmentForm);

      return;
    }

    // Se llama al servicio de apartamentos para editar el apartamento, el comentario de arriba es sólo el método, pero se quería hacer el importante
    this.apartmentsService
      .editApartment(this.apartmentId(), this.apartmentForm.value)
      .subscribe({
        next: () => this.router.navigate(['/apartments']),
        // TODO: mostrar un mensaje de error
        error: (err) => console.log('ERROR', err),
      });
  }
}

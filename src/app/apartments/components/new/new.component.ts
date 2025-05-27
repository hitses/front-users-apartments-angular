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
})
export default class NewComponent {
  // Propiedades del componente
  public formFields = apartmentFields;
  public validField = isValidField;

  // Inyección de dependencias (no se usa el constructor)
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly apartmentsService = inject(ApartmentsService);

  // Se resetea el formulario dinámico al inicializar el componente, no al momento de su construcción
  ngOnInit() {
    this.apartmentForm.reset();
  }

  // Formulario reactivo para crear un nuevo apartamento
  apartmentForm: FormGroup = this.fb.group(apartmentFormValidations);

  // Método para crear un nuevo apartamento y redireccionar a la página de apartamentos si todo va bien e irá bien, ya te digo yo a ti que sí
  createApartment() {
    // Si el formulario, por alguna razón que se escape al control del desarrollador, no es válido, se marcan todos los campos como "tocados" para que se muestren errores en los campos incorrectos, aunque el botón de crear no se active hasta que el formulario sea válido
    if (this.apartmentForm.invalid) {
      markAllFormFieldsAsTouched(this.apartmentForm);

      return;
    }

    // Aquí se llama al servicio de apartamentos para crear un nuevo apartamento y se redirecciona a la página de apartamentos si todo va bien, porque sí, todo irá bien, palabrica de desarrollador
    this.apartmentsService.createApartment(this.apartmentForm.value).subscribe({
      next: () => this.router.navigate(['/apartments']),
      // TODO: mostrar un mensaje de error
      error: (err) => console.log('ERROR', err),
    });
  }
}

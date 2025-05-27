import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../../../../types/form-field';
import { isValidField } from '../../utils/form-validation';

@Component({
  selector: 'dynamic-form-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent {
  // Propiedades entrantes del componente (usando la manera antigua para que se vea que sé usarla)
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) fields!: FormField[];
  @Input() submitButtonText: string = 'Submit';

  // Eventos de salida del componente (usando la manera antigua para que se vea que sé usarla)
  @Output() formSubmit = new EventEmitter<void>();

  // Propiedad del componente
  public isValidField = isValidField;

  // Método que se ejecuta cuando se envía el formulario, enviando todo el evento que origina al componente padre
  onSubmit() {
    this.formSubmit.emit();
  }
}

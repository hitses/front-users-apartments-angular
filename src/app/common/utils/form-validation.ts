import { FormGroup } from '@angular/forms';

// Función que se encarga de validar si un campo del formulario es válido y ha sido tocado para controlar la visualización de errores
export function isValidField(
  form: FormGroup,
  field: string,
): boolean | null | undefined {
  const control = form.get(field);

  return control?.errors && control?.touched;
}

// Función que marca todos los campos del formulario como "tocados" para que se muestren los errores de validación
export function markAllFormFieldsAsTouched(form: FormGroup): void {
  form.markAllAsTouched();
}

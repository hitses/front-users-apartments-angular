import { FormGroup } from '@angular/forms';

export function isValidField(
  form: FormGroup,
  field: string
): boolean | null | undefined {
  const control = form.get(field);

  return control?.errors && control?.touched;
}

export function markAllFormFieldsAsTouched(form: FormGroup): void {
  form.markAllAsTouched();
}

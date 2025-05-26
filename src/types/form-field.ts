// Tipos de campos permitidos en el formulario dinámico
// El formulario dinámico se encuentra en la ruta:
// src/app/components/dynamic-form
export type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea';

// Propiedades obligatorias y opcionales que puede tener un campo del formulario dinámico
export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  min?: number;
  max?: number;
  step?: number;
  hidden?: boolean;
}

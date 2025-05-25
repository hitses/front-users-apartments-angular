export type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea';

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  min?: number;
  max?: number;
  step?: number;
  hidden?: boolean;
}

// Este archivo contiene las definiciones de los campos de un formulario reactivo para crear un nuevo usuario o editar uno existente y sus validaciones
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../../../types/patterns';
import { FormField } from '../../../types/form-field';

// Función que comprueba si el campo de contraseña es válido y contiene los caracteres requeridos
const getPasswordErrors = (
  passwordControl: AbstractControl,
): ValidationErrors | null => {
  const value = passwordControl?.value as string;
  const errors: Record<string, boolean> = {};

  // Si no hay contraseña, no se sigue para adelante
  if (value === null) return null;

  // Se comprueba si la contraseña tiene al menos 8 caracteres y no más de 20
  if (value.length < 8 || value.length > 20) errors['lengthError'] = true;
  // Se comprueba si la contraseña contiene al menos una letra mayúscula
  if (!/[A-Z]/.test(value)) errors['noUppercase'] = true;
  // Se comprueba si la contraseña contiene al menos una letra minúscula
  if (!/[a-z]/.test(value)) errors['noLowercase'] = true;
  // Se comprueba si la contraseña contiene al menos un número
  if (!/\d/.test(value)) errors['noDigit'] = true;

  // ¿Que todo va como la seda o no? El ternario devuelve la lista de errores si hay alguno, o null si no hay ninguno
  return Object.keys(errors).length > 0 ? errors : null;
};

// Definiciones de los campos del formulario reactivo para crear un nuevo usuario o editar uno existente
export const userFormValidations = {
  username: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(20),
  ]),
  firstName: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
  ]),
  lastName: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
  ]),
  email: new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_PATTERN), // No me fio del validador que viene por defecto en Angular (alguna cosa mala tenía que tener) por lo que uso mi propio RegEx
  ]),
  phone: new FormControl('', [
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(9),
  ]),
  password: new FormControl('', [
    Validators.required,
    Validators.pattern(PASSWORD_PATTERN), // Este RegEx permite que se valide el campo de contraseña
    getPasswordErrors, // Y este validador me devuelve los errores que necesito para mostrarlos en el HTML
  ]),
  confirmPassword: new FormControl('', [
    Validators.required,
    Validators.pattern(PASSWORD_PATTERN),
  ]),
};

// Validador que comprueba que las contraseñas coincidan
export const userFormValidators = [
  (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  },
];

// Lista de los campos y sus demás etiquetas que se mostrarán en el formulario dinámico para crear un nuevo usuario
export const userCreateFields: FormField[] = [
  { name: 'username', label: 'Username', type: 'text' },
  { name: 'firstName', label: 'First name', type: 'text' },
  { name: 'lastName', label: 'Last name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm password', type: 'password' },
];

// Lista de los campos y sus demás etiquetas que se mostrarán en el formulario dinámico para editar un usuario
export const userEditFields: FormField[] = [
  { name: 'username', label: 'Username', type: 'text' },
  { name: 'firstName', label: 'First name', type: 'text' },
  { name: 'lastName', label: 'Last name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'text' },
  // Especial atención a las dos últimas propiedades, ya que no queremos que se muestre el campo de contraseña en el formulario de actualización de usuario
  { name: 'password', label: 'Password', type: 'password', hidden: true },
  {
    name: 'confirmPassword',
    label: 'Confirm password',
    type: 'password',
    hidden: true,
  },
];

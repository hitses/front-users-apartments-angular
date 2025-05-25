import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../types/patterns';

const getPasswordErrors = (
  passwordControl: AbstractControl
): ValidationErrors | null => {
  const value = passwordControl?.value as string;
  const errors: Record<string, boolean> = {};

  if (value === null) return null;

  if (value.length < 8 || value.length > 20) errors['lengthError'] = true;
  if (!/[A-Z]/.test(value)) errors['noUppercase'] = true;
  if (!/[a-z]/.test(value)) errors['noLowercase'] = true;
  if (!/\d/.test(value)) errors['noDigit'] = true;

  return Object.keys(errors).length > 0 ? errors : null;
};

export const userForm = {
  username: new FormControl('prueba', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(20),
  ]),
  firstName: new FormControl('prueba', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
  ]),
  lastName: new FormControl('prueba', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
  ]),
  email: new FormControl('prueba@prueba.com', [
    Validators.required,
    Validators.pattern(EMAIL_PATTERN),
  ]),
  phone: new FormControl('000000001', [
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(9),
  ]),
  password: new FormControl('123123aS', [
    Validators.required,
    Validators.pattern(PASSWORD_PATTERN),
    getPasswordErrors,
  ]),
  confirmPassword: new FormControl('123123aS', [
    Validators.required,
    Validators.pattern(PASSWORD_PATTERN),
  ]),
};

export const userFormValidators = [
  (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  },
];

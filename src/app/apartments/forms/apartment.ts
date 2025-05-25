import { FormControl, Validators } from '@angular/forms';
import { FormField } from '../../../types/form-field';

export const apartmentFormValidations = {
  rooms: new FormControl('', [Validators.required, Validators.min(1)]),
  bathrooms: new FormControl('', [Validators.required, Validators.min(1)]),
  area: new FormControl('', [Validators.required, Validators.min(1)]),
  floor: new FormControl('', [Validators.required, Validators.min(0)]),
  description: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(1000),
  ]),
  price: new FormControl('', [Validators.required, Validators.min(0)]),
};

export const apartmentFields: FormField[] = [
  { name: 'rooms', label: 'Rooms', type: 'number', min: 1 },
  { name: 'bathrooms', label: 'Bathrooms', type: 'number', min: 1 },
  { name: 'area', label: 'Area', type: 'number', min: 1 },
  { name: 'floor', label: 'Floor', type: 'number', min: 1 },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'price', label: 'Price', type: 'number', min: 0.01, step: 0.01 },
];

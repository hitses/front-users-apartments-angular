import { FormControl, Validators } from '@angular/forms';

export const apartmentForm = {
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

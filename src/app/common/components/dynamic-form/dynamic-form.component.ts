// src/app/shared/components/dynamic-form/dynamic-form.component.ts

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
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) fields!: FormField[];
  @Input() submitButtonText: string = 'Submit';

  @Output() formSubmit = new EventEmitter<void>();

  public isValidField = isValidField;

  onSubmit() {
    this.formSubmit.emit();
  }
}

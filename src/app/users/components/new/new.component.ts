import { Component, inject } from '@angular/core';
import { UsersService } from '../../users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  userCreateFields,
  userFormValidations,
  userFormValidators,
} from '../../forms/user';
import { Router } from '@angular/router';
import {
  isValidField,
  markAllFormFieldsAsTouched,
} from '../../../common/utils/form-validation';
import { DynamicFormComponent } from '../../../common/components/dynamic-form/dynamic-form.component';
import { FormHeadComponent } from '../../../common/components/form-head/form-head.component';

@Component({
  selector: 'app-new',
  imports: [DynamicFormComponent, FormHeadComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export default class NewComponent {
  public formFields = userCreateFields;
  public validField = isValidField;

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);

  ngOnInit() {
    this.userForm.reset();
  }

  userForm: FormGroup = this.fb.group(userFormValidations, {
    validators: userFormValidators,
  });

  createUser() {
    if (this.userForm.invalid) {
      markAllFormFieldsAsTouched(this.userForm);

      return;
    }

    const newUser = this.userForm.value;
    delete newUser.confirmPassword;

    this.usersService.createUser(newUser).subscribe({
      next: () => this.router.navigate(['/users']),
      // TODO: mostrar un mensaje de error
      error: (err) => console.log('ERROR', err),
    });
  }
}

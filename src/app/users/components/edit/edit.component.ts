import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { BackButtonComponent } from '../../../common/components/back-button/back-button.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  userEditFields,
  userFormValidations,
  userFormValidators,
} from '../../forms/user';
import {
  isValidField,
  markAllFormFieldsAsTouched,
} from '../../../common/utils/form-validation';
import { DynamicFormComponent } from '../../../common/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-edit',
  imports: [BackButtonComponent, DynamicFormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export default class EditComponent {
  public formFields = userEditFields;
  public validField = isValidField;

  userId = signal<number>(0);

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);

  constructor() {
    this.userForm = this.fb.group(userFormValidations, {
      validators: userFormValidators,
    });

    this.userForm.removeControl('password');
    this.userForm.removeControl('confirmPassword');
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId.set(params['id']);
      this.getUser();
    });
  }

  userForm: FormGroup;

  getUser() {
    this.usersService.findUser(this.userId()).subscribe({
      next: (user) => this.userForm.patchValue(user),
      error: (err) => {
        console.log('Error getting user', err);
        this.router.navigate(['/users']);
      },
    });
  }

  editUser() {
    if (this.userForm.invalid) {
      markAllFormFieldsAsTouched(this.userForm);

      return;
    }

    this.usersService.updateUser(this.userId(), this.userForm.value).subscribe({
      next: () => this.router.navigate(['/users']),
      // TODO: mostrar un mensaje de error
      error: (err) => console.log('ERROR', err),
    });
  }
}

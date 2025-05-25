import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../users.service';
import { BackButtonComponent } from '../../../common/components/back-button/back-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { userForm, userFormValidators } from '../../forms/user';
import { Router } from '@angular/router';
import {
  isValidField,
  markAllFormFieldsAsTouched,
} from '../../../common/utils/form-validation';

@Component({
  selector: 'app-new',
  imports: [BackButtonComponent, ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export default class NewComponent {
  // TODO: comprobar el uso de esta propiedad
  private notSamePassword = signal<boolean>(false);

  public validField = isValidField;

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);

  ngOnInit() {
    this.userForm.reset();
  }

  userForm: FormGroup = this.fb.group(userForm, {
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

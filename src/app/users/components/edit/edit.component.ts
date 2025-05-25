import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { User } from '../../../../interfaces/user';
import { BackButtonComponent } from '../../../common/components/back-button/back-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { userForm, userFormValidators } from '../../forms/user';
import {
  isValidField,
  markAllFormFieldsAsTouched,
} from '../../../common/utils/form-validation';

@Component({
  selector: 'app-edit',
  imports: [BackButtonComponent, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export default class EditComponent {
  userId = signal<number>(0);
  user = signal<User>({} as User);

  public validField = isValidField;

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);

  constructor() {
    this.userForm = this.fb.group(userForm, {
      validators: userFormValidators,
    });

    this.userForm.removeControl('password');
    this.userForm.removeControl('confirmPassword');
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId.set(params['id']);
    });

    this.getUser();
  }

  userForm: FormGroup;

  getUser() {
    this.usersService.findUser(this.userId()).subscribe({
      next: (user) => this.userForm.patchValue(user),
      error: (err) => console.log('ERROR', err),
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

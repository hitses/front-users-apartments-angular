import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../users.service';
import { BackButtonComponent } from '../../../common/components/back-button/back-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { userForm, userFormValidators } from '../../forms/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  imports: [BackButtonComponent, ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export default class NewComponent {
  notSamePassword = signal<boolean>(false);

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);

  ngOnInit() {
    this.userForm.reset();
  }

  userForm: FormGroup = this.fb.group(userForm, {
    validators: userFormValidators,
  });

  validField(field: string) {
    return (
      this.userForm.controls[field].errors &&
      this.userForm.controls[field].touched
    );
  }

  createUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
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

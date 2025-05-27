import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../users.service';
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
import { FormHeadComponent } from '../../../common/components/form-head/form-head.component';

@Component({
  selector: 'app-edit',
  imports: [DynamicFormComponent, FormHeadComponent],
  templateUrl: './edit.component.html',
})
export default class EditComponent {
  // Propiedades del componente
  public formFields = userEditFields;
  public validField = isValidField;

  userId = signal<number>(0);

  // Inyección de dependencias (no se usa el constructor)
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);

  // Se inicializa el formulario reactivo para editar un usuario, eliminando los campos de contraseña y confirmación de contraseña
  constructor() {
    this.userForm = this.fb.group(userFormValidations, {
      validators: userFormValidators,
    });

    this.userForm.removeControl('password');
    this.userForm.removeControl('confirmPassword');
  }

  // Se obtiene el ID del usuario desde la ruta y se carga el usuario al inicializar el componente
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId.set(params['id']);

      this.getUser();
    });
  }

  // Formulario reactivo para editar un usuario
  userForm: FormGroup;

  // Se obtiene el usuario usando el servicio de usuarios
  getUser() {
    this.usersService.findUser(this.userId()).subscribe({
      next: (user) => this.userForm.patchValue(user),
      error: (err) => {
        console.log('Error getting user', err);
        this.router.navigate(['/users']);
      },
    });
  }

  // Se edita el usuario usando el servicio de usuarios y se redirecciona a la página de usuarios si todo va bien, que seguro que todo irá bien, te lo digo yo que lo he programado
  editUser() {
    // Si el formulario, por alguna razón que se escape al control del desarrollador, no es válido, se marcan todos los campos como "tocados" para que se muestren errores en los campos incorrectos, aunque el botón de editar no se active hasta que el formulario sea válido
    if (this.userForm.invalid) {
      markAllFormFieldsAsTouched(this.userForm);

      return;
    }

    // Se llama al servicio de usuarios para editar el usuario
    this.usersService.updateUser(this.userId(), this.userForm.value).subscribe({
      next: () => this.router.navigate(['/users']),
      // TODO: mostrar un mensaje de error
      error: (err) => console.log('ERROR', err),
    });
  }
}

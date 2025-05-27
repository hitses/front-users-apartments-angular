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
})
export default class NewComponent {
  // Propiedades del componente
  public formFields = userCreateFields;
  public validField = isValidField;

  // Inyección de dependencias (no se usa el constructor)
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);

  // Se resetea el formulario dinámico al inicializar el componente, no al momento de su construcción
  ngOnInit() {
    this.userForm.reset();
  }

  // Formulario reactivo para crear un nuevo usuario
  userForm: FormGroup = this.fb.group(userFormValidations, {
    validators: userFormValidators,
  });

  // Método para crear un nuevo usuario y redireccionar a la página de usuarios si todo va bien, que irá bien, ¿verdad? ¿VERDAD?
  createUser() {
    // Si el formulario, por alguna razón que se escape al control del desarrollador, no es válido, se marcan todos los campos como "tocados" para que se muestren errores en los campos incorrectos, aunque el botón de crear no se active hasta que el formulario sea válido
    if (this.userForm.invalid) {
      markAllFormFieldsAsTouched(this.userForm);

      return;
    }

    // Se añade en una nueva variable la información del formulario para eliminar la propiedad 'confirmPassword' del objeto que se enviará al servidor, ya que no se requiere para crear un nuevo usuario
    const newUser = this.userForm.value;
    delete newUser.confirmPassword;

    // Se llama al servicio de usuarios para crear un nuevo usuario y se redirecciona a la página de usuarios si todo va bien, porque, sí, todo irá bien
    this.usersService.createUser(newUser).subscribe({
      next: () => this.router.navigate(['/users']),
      // TODO: mostrar un mensaje de error
      error: (err) => console.log('ERROR', err),
    });
  }
}

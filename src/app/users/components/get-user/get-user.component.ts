import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../interfaces/user';
import { UsersService } from '../../users.service';
import { FormHeadComponent } from '../../../common/components/form-head/form-head.component';
import { DatePipe, LowerCasePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [FormHeadComponent, TitleCasePipe, LowerCasePipe, DatePipe],
  templateUrl: './get-user.component.html',
})
export default class GetUsersComponent {
  // Propiedades del componente
  userId = signal<number>(0);
  user = signal<User>({} as User);

  // Inyección de dependencias (no se usa el constructor)
  private readonly route = inject(ActivatedRoute);
  private readonly usersService = inject(UsersService);

  // Se obtiene el ID del usuario desde la ruta y se carga el usuario al inicializar el componente
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId.set(params['id']);

      this.getUser();
    });
  }

  // Se obtiene el usuario usando el servicio de usuarios
  getUser() {
    this.usersService.findUser(this.userId()).subscribe({
      next: (user) => this.user.set(user),
      error: (err) => console.log('ERROR', err),
    });
  }
}

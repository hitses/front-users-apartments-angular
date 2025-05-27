import { Component, inject, signal } from '@angular/core';
import { User } from '../../interfaces/user';
import { UsersService } from './users.service';
import { DynamicTableComponent } from '../common/components/dynamic-table/dynamic-table.component';
import { TableColumn } from '../../interfaces/table-column';
import { PageHeadComponent } from '../common/components/page-head/page-head.component';
import { ConfirmationService } from '../common/services/confirmation-service.service';

@Component({
  selector: 'app-users',
  imports: [DynamicTableComponent, PageHeadComponent],
  templateUrl: './users.component.html',
})
export default class UsersComponent {
  // Propiedades del componente
  users = signal<User[]>([]);
  // Columnas de la tabla dinámica
  userColumns = signal<TableColumn[]>([
    { field: 'id', header: 'ID' },
    { field: 'firstName', header: 'Name', pipe: 'titlecase' },
    { field: 'email', header: 'Email', pipe: 'lowercase' },
  ]);

  // Inyección de dependencias (no se usa el constructor)
  private usersService = inject(UsersService);
  private readonly confirmationService = inject(ConfirmationService);

  // Obtenemos todos los usuarios al inicializar el componente, no al momento de su construcción
  ngOnInit() {
    this.findAllUsers();
  }

  // Método para obtener todos los usuarios y actualizar la propiedad 'users' con los datos obtenidos
  findAllUsers() {
    this.usersService.findAllUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  // Método para eliminar un usuario y actualizar la propiedad 'users' con los datos obtenidos
  deleteUser(id: number): void {
    this.confirmationService.confirmAndDelete(
      id,
      'User',
      (userId) => this.usersService.deleteUser(userId),
      () => this.findAllUsers(),
    );
  }
}

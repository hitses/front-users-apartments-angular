import { Component, inject, signal } from '@angular/core';
import { User, UserTable } from '../../interfaces/user';
import { UsersService } from './users.service';
import { RouterLink } from '@angular/router';
import { DynamicTableComponent } from '../common/components/dynamic-table/dynamic-table.component';
import { TableColumn } from '../../interfaces/table-column';

@Component({
  selector: 'app-users',
  imports: [RouterLink, DynamicTableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export default class UsersComponent {
  users: UserTable[] = [
    { id: 1, firstName: 'Juan Pérez', email: 'juan@example.com' },
    { id: 2, firstName: 'María García', email: 'maria@example.com' },
    { id: 3, firstName: 'Carlos López', email: 'carlos@example.com' },
  ];

  userColumns: TableColumn[] = [
    { field: 'id', header: 'ID' },
    { field: 'firstName', header: 'Nombre' },
    { field: 'email', header: 'Email' },
  ];

  private usersService = inject(UsersService);

  ngOnInit() {
    this.findAllUsers();
  }

  findAllUsers() {
    this.usersService.findAllUsers();
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
  }
}

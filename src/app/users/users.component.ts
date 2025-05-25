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
  users = signal<User[]>([]);
  userColumns = signal<TableColumn[]>([
    { field: 'id', header: 'ID' },
    { field: 'firstName', header: 'Nombre' },
    { field: 'email', header: 'Email' },
  ]);

  private usersService = inject(UsersService);

  ngOnInit() {
    this.findAllUsers();
  }

  findAllUsers() {
    this.usersService.findAllUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe({
      next: () => this.findAllUsers(),
      error: (err) => console.log('ERROR', err),
    });
  }
}

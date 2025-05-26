import { Component, inject, signal } from '@angular/core';
import { User } from '../../interfaces/user';
import { UsersService } from './users.service';
import { DynamicTableComponent } from '../common/components/dynamic-table/dynamic-table.component';
import { TableColumn } from '../../interfaces/table-column';
import { PageHeadComponent } from '../common/components/page-head/page-head.component';

@Component({
  selector: 'app-users',
  imports: [DynamicTableComponent, PageHeadComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export default class UsersComponent {
  users = signal<User[]>([]);
  userColumns = signal<TableColumn[]>([
    { field: 'id', header: 'ID' },
    { field: 'firstName', header: 'Name' },
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

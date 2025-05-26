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
  users = signal<User[]>([]);
  userColumns = signal<TableColumn[]>([
    { field: 'id', header: 'ID' },
    { field: 'firstName', header: 'Name', pipe: 'titlecase' },
    { field: 'email', header: 'Email' },
  ]);

  private usersService = inject(UsersService);
  private readonly confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.findAllUsers();
  }

  findAllUsers() {
    this.usersService.findAllUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  deleteUser(id: number): void {
    this.confirmationService.confirmAndDelete(
      id,
      'User',
      (userId) => this.usersService.deleteUser(userId),
      () => this.findAllUsers()
    );
  }
}

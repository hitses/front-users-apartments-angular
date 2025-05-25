import { Component, inject, signal } from '@angular/core';
import { User } from '../../interfaces/user';
import { UsersService } from './users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export default class UsersComponent {
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

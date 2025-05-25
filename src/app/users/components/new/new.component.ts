import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../users.service';
import { User } from '../../../../interfaces/user';

@Component({
  selector: 'app-new',
  imports: [],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export default class NewComponent {
  user = signal<User>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });

  private readonly usersService = inject(UsersService);

  createUser() {
    this.usersService.createUser(this.user());
  }
}

import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  createUser(user: User) {
    console.log('createUser', user);
  }

  findAllUsers() {
    console.log('findAllUsers');
  }

  findUser(id: number) {
    console.log('findUser', id);
  }

  updateUser(id: number, user: User) {
    console.log('updateUser', id, user);
  }

  deleteUser(id: number) {
    console.log('deleteUser', id);
  }
}

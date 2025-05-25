import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../interfaces/user';
import { UsersService } from '../../users.service';
import { BackButtonComponent } from '../../../common/back-button/back-button.component';

@Component({
  selector: 'app-users',
  imports: [BackButtonComponent],
  templateUrl: './get-user.component.html',
  styleUrl: './get-user.component.scss',
})
export default class GetUsersComponent {
  userId = signal<number>(0);
  user = signal<User>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });

  private readonly route = inject(ActivatedRoute);
  private readonly usersService = inject(UsersService);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId.set(params['id']);
    });
  }

  getUser() {
    this.usersService.findUser(this.userId());
  }
}

import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../interfaces/user';
import { UsersService } from '../../users.service';
import { BackButtonComponent } from '../../../common/components/back-button/back-button.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [BackButtonComponent, JsonPipe],
  templateUrl: './get-user.component.html',
  styleUrl: './get-user.component.scss',
})
export default class GetUsersComponent {
  userId = signal<number>(0);
  user = signal<User>({} as User);

  private readonly route = inject(ActivatedRoute);
  private readonly usersService = inject(UsersService);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId.set(params['id']);
    });

    this.getUser();
  }

  getUser() {
    console.log('pillo el user');
    this.usersService.findUser(this.userId()).subscribe({
      next: (user) => this.user.set(user),
      error: (err) => console.log('ERROR', err),
    });
  }
}

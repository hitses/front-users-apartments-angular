import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../interfaces/user';
import { UsersService } from '../../users.service';
import { FormHeadComponent } from '../../../common/components/form-head/form-head.component';
import { DatePipe, LowerCasePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [FormHeadComponent, TitleCasePipe, LowerCasePipe, DatePipe],
  templateUrl: './get-user.component.html',
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
    this.usersService.findUser(this.userId()).subscribe({
      next: (user) => this.user.set(user),
      error: (err) => console.log('ERROR', err),
    });
  }
}

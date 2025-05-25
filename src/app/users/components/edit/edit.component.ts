import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../users.service';
import { User } from '../../../../interfaces/user';
import { BackButtonComponent } from '../../../common/back-button/back-button.component';

@Component({
  selector: 'app-edit',
  imports: [BackButtonComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export default class EditComponent {
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

  editUser() {
    this.usersService.updateUser(this.userId(), this.user());
  }
}

import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserEntity } from '../../store/users/models/user.entity';
import { usersSelectors } from '../../store/users/users.selectors';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from '../../shared/svg-icon/svg-icon.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [AsyncPipe, SvgIconComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  public user$: Observable<UserEntity | null>;

  constructor(private store: Store) {
    this.user$ = this.store.select(usersSelectors.currentUser);
  }
}

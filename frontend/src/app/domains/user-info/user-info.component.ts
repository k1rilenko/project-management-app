import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserEntity } from '../../store/users/models/user.entity';
import { usersSelectors } from '../../store/users/users.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
import { SvgIconComponent } from '../../shared/svg-icon/svg-icon.component';
import { DropdownMenuComponent } from '../../shared/dropdown-menu/dropdown-menu.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { ButtonComponent } from '../../shared/button/button.component';
import { ModalPathEnum } from '../modal/modal-path.enum';
import { TokenService } from '../../services/token/token.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [AsyncPipe, SvgIconComponent, DropdownMenuComponent, ClickOutsideDirective, NgIf, ButtonComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  public user$: Observable<UserEntity | null>;
  public isShownDropdownMenu = false;

  constructor(
    private store: Store,
    private tokenService: TokenService,
    private modalService: ModalService,
  ) {
    this.user$ = this.store.select(usersSelectors.currentUser);
  }

  setDropDownMenuViewStatus(status: boolean) {
    this.isShownDropdownMenu = status;
  }

  logOut() {
    this.tokenService.deleteToken();
  }

  editProfile() {
    this.modalService.open(ModalPathEnum.EDIT_USER);
  }
}

import { AbstractConfirmationDialogConfig } from './abstract-confirmation-dialog-config';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, take } from 'rxjs';
import { usersSelectors } from '../../../store/users/users.selectors';
import { usersActions } from '../../../store/users/users.actions';

@Injectable()
export class DeleteUserConfirmationDialogConfig extends AbstractConfirmationDialogConfig {
  private store = inject(Store);

  constructor() {
    super();
    this.store
      .select(usersSelectors.currentUser)
      .pipe(
        filter(user => !!user),
        map(({ name }) => name),
        switchMap(username => this.getTranslate('confirmation-dialog.delete-user', username)),
        take(1),
      )
      .subscribe(text => {
        this.setMessage(text);
      });
  }

  onConfirm() {
    this.store.dispatch(usersActions.deleteUser());
  }
}

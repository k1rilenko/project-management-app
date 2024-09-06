import { AbstractConfirmationDialogConfig } from './abstract-confirmation-dialog-config';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { routerSelectors } from '../../../store/router/router.selectors';
import { tasksActions } from '../../../store/tasks/tasks.actions';
import { BehaviorSubject, filter, map, Observable, switchMap, take } from 'rxjs';
import { isNotUndefined } from '../../../utils/is-not-undefined';
import { tasksSelectors } from '../../../store/tasks/tasks.selectors';
import { columnsSelectors } from '../../../store/columns/columns.selectors';
import { columnsActions } from '../../../store/columns/columns.actions';
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
        take(1),
      )
      .subscribe(username => {
        this.setMessage(`Are you sure you want to delete the user ${username} ?`);
      });
  }

  onConfirm() {
    this.store.dispatch(usersActions.deleteUser());
  }

  onCancel() {
    console.log('Delete Board Confirmation Dialog onCancel');
  }
}

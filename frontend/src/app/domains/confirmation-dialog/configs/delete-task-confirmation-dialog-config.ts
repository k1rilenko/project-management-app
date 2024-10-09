import { AbstractConfirmationDialogConfig } from './abstract-confirmation-dialog-config';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { routerSelectors } from '../../../store/router/router.selectors';
import { tasksActions } from '../../../store/tasks/tasks.actions';
import { filter, map, switchMap, take, tap } from 'rxjs';
import { isNotUndefined } from '../../../utils/is-not-undefined';
import { tasksSelectors } from '../../../store/tasks/tasks.selectors';

@Injectable()
export class DeleteTaskConfirmationDialogConfig extends AbstractConfirmationDialogConfig {
  private store = inject(Store);
  private taskID: string | undefined;

  constructor() {
    super();
    this.store
      .select(routerSelectors.params.confirmationDialogParam)
      .pipe(
        filter(isNotUndefined),
        switchMap(taskId =>
          this.store.select(tasksSelectors.taskById(taskId)).pipe(
            filter(isNotUndefined),
            map(taskEntity => ({
              taskId: taskEntity.id,
              taskName: taskEntity.title,
            })),
          ),
        ),
        tap(({ taskId }) => (this.taskID = taskId)),
        switchMap(({ taskName }) => this.getTranslate('confirmation-dialog.delete-task', taskName)),
        take(1),
      )
      .subscribe(text => {
        this.setMessage(text);
      });
  }

  onConfirm() {
    if (this.taskID) {
      this.store.dispatch(tasksActions.deleteTask({ taskId: this.taskID }));
    }
  }
}

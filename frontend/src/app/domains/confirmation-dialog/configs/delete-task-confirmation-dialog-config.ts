import { AbstractConfirmationDialogConfig } from './abstract-confirmation-dialog-config';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { routerSelectors } from '../../../store/router/router.selectors';
import { tasksActions } from '../../../store/tasks/tasks.actions';
import { BehaviorSubject, filter, map, Observable, switchMap, take } from 'rxjs';
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
        take(1),
        switchMap(taskId =>
          this.store.select(tasksSelectors.taskById(taskId)).pipe(
            filter(isNotUndefined),
            map(taskEntity => ({
              taskId: taskEntity.id,
              taskName: taskEntity.title,
            })),
          ),
        ),
      )
      .subscribe(({ taskId, taskName }) => {
        this.taskID = taskId;
        this.setMessage(this.taskID ? `Delete Task: ${taskName}` : 'Delete Task Confirmation Dialog');
      });
  }

  onConfirm() {
    if (this.taskID) {
      this.store.dispatch(tasksActions.deleteTask({ taskId: this.taskID }));
    }
  }

  onCancel() {
    console.log('Delete Board Confirmation Dialog onCancel');
  }
}

import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { routerSelectors } from '../../store/router/router.selectors';
import { BehaviorSubject, combineLatest, filter, map, Observable, switchMap, tap } from 'rxjs';
import { isNotUndefined } from '../../utils/is-not-undefined';
import { tasksSelectors } from '../../store/tasks/tasks.selectors';
import { AsyncPipe } from '@angular/common';
import { TaskEntity } from '../../store/tasks/models/task.entity';
import { TaskViewModel } from './models/task.view-model';
import { usersSelectors } from '../../store/users/users.selectors';
import { columnsSelectors } from '../../store/columns/columns.selectors';
import { ButtonComponent } from '../../shared/button/button.component';
import { Router } from '@angular/router';
import { ModalPathEnum } from '../modal/modal-path.enum';
import { ConfirmationDialogName } from '../confirmation-dialog/models/confirmation-dialog-name.enum';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [AsyncPipe, ButtonComponent, TranslateModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  public vm$: Observable<TaskViewModel | undefined>;

  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.vm$ = this.store.select(routerSelectors.params.taskId).pipe(
      filter(isNotUndefined),
      switchMap(taskId =>
        this.store.select(tasksSelectors.taskById(taskId)).pipe(
          filter(isNotUndefined),
          switchMap(taskEntity =>
            combineLatest([
              this.store.select(usersSelectors.userById(taskEntity.userId)),
              this.store.select(columnsSelectors.columnById(taskEntity.columnId)),
            ]).pipe(
              map(([userEntity, columnEntity]) => {
                if (userEntity && columnEntity) {
                  const vm: TaskViewModel = {
                    id: taskId,
                    columnName: columnEntity.title,
                    userName: userEntity.name,
                    title: taskEntity.title,
                    description: taskEntity.description,
                  };
                  return vm;
                }
                return undefined;
              }),
            ),
          ),
        ),
      ),
    );
  }

  editTask(taskId: TaskEntity['id']) {
    this.router.navigate([{ outlets: { modal: [ModalPathEnum.EDIT_TASK, taskId] } }]);
  }

  deleteTask(taskId: TaskEntity['id']) {
    this.router.navigate([{ outlets: { modal: [ModalPathEnum.CONFIRMATION_DIALOG, ConfirmationDialogName.DELETE_TASK, taskId] } }]);
  }
}

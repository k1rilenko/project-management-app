import { Component, Input, OnInit } from '@angular/core';
import { TaskEntity } from '../../store/tasks/models/task.entity';
import { Store } from '@ngrx/store';
import { filter, map, Observable, switchMap, withLatestFrom } from 'rxjs';
import { TaskPreviewViewModal } from './models/task-preview.view-modal';
import { tasksSelectors } from '../../store/tasks/tasks.selectors';
import { isNotUndefined } from '../../utils/is-not-undefined';
import { usersSelectors } from '../../store/users/users.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-task-preview',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './task-preview.component.html',
  styleUrl: './task-preview.component.scss',
})
export class TaskPreviewComponent implements OnInit {
  @Input() taskId!: TaskEntity['id'];
  public vm$: Observable<TaskPreviewViewModal> | undefined;

  constructor(private store: Store<TaskEntity>) {}

  ngOnInit(): void {
    this.vm$ = this.store.select(tasksSelectors.taskById(this.taskId)).pipe(
      filter(isNotUndefined),
      switchMap(taskEntity =>
        this.store.select(usersSelectors.userById(taskEntity.userId)).pipe(
          filter(isNotUndefined),
          map(userEntity => {
            return {
              title: taskEntity.title,
              userName: userEntity.name,
            };
          }),
        ),
      ),
    );
  }
}
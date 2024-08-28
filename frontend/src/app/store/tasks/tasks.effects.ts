import { effect, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api/api.service';
import { tasksActions } from './tasks.actions';
import { catchError, filter, forkJoin, map, mergeMap, of, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { columnsSelectors } from '../columns/columns.selectors';
import { getAllTasksRequest } from '../../services/api/requests/task/get-all-tasks.request';
import { routerSelectors } from '../router/router.selectors';
import { isNotUndefined } from '../../utils/is-not-undefined';
import { TaskEntityMapper } from './mappers/task-entity.mapper';
import { columnsActions } from '../columns/columns.actions';
import { createTaskRequest, CreateTaskRequestParam } from '../../services/api/requests/task/create-task.request';
import { TaskEntity } from './models/task.entity';
import { tasksSelectors } from './tasks.selectors';
import { updateTaskRequest, UpdateTaskRequestParam } from '../../services/api/requests/task/update-task.request';
import { UpdateTaskRequestBodyMapper } from './mappers/update-task-request-body.mapper';
import { ModalService } from '../../domains/modal/modal.service';

@Injectable()
export class TasksEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private store = inject(Store);
  private taskEntityMapper = inject(TaskEntityMapper);
  private updateTaskRequestBodyMapper = inject(UpdateTaskRequestBodyMapper);
  private modalService = inject(ModalService);

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.getTasks),
      withLatestFrom(
        this.store.select(columnsSelectors.selectIds),
        this.store.select(routerSelectors.params.boardId).pipe(filter(isNotUndefined)),
      ),
      mergeMap(([_, columnIds, boardId]) => {
        const requests = columnIds.map(id =>
          this.apiService.send(
            getAllTasksRequest({
              columnId: id.toString(),
              boardId,
            }),
          ),
        );
        return forkJoin(requests).pipe(
          map(tasks => {
            const tasksDtoArray = tasks.flat();
            const taskEntities = tasksDtoArray.map(taskDto => this.taskEntityMapper.mapFrom(taskDto));
            return tasksActions.getTasksSuccess({ taskEntities });
          }),
          catchError(() => of(tasksActions.getTasksFailed())),
        );
      }),
    ),
  );

  startLoadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(columnsActions.getColumnsSuccess),
      map(() => tasksActions.getTasks()),
    ),
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.createTask),
      withLatestFrom(this.store.select(routerSelectors.params.boardId).pipe(filter(isNotUndefined))),
      switchMap(([{ params }, boardId]) => {
        const requestParams: CreateTaskRequestParam = {
          ...params,
          boardId,
        };
        return this.apiService.send(createTaskRequest(requestParams)).pipe(
          map(createTaskDto => {
            const taskEntity: TaskEntity = {
              ...createTaskDto,
              boardId,
              columnId: params.columnId,
              isLoading: false,
              order: 0,
            };
            return taskEntity;
          }),
        );
      }),
      map(taskEntity => tasksActions.createTaskSuccess({ taskEntity })),
      tap(() => this.modalService.close()),
      catchError(() => of(tasksActions.createTaskFailed())),
    ),
  );

  updateTaskAfterDrag$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(tasksActions.dragTask),
        withLatestFrom(this.store.select(routerSelectors.params.boardId).pipe(filter(isNotUndefined))),
        mergeMap(([{ taskId, prevColumnId }, boardId]) =>
          this.store.select(tasksSelectors.taskById(taskId)).pipe(
            take(1),
            filter(isNotUndefined),
            switchMap(taskEntity => {
              const body = this.updateTaskRequestBodyMapper.mapFrom(taskEntity);
              const updateParams: UpdateTaskRequestParam = {
                taskId,
                boardId,
                columnId: prevColumnId,
                body,
              };
              return this.apiService.send(updateTaskRequest(updateParams));
            }),
          ),
        ),
      ),
    { dispatch: false },
  );
}

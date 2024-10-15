import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { columnsActions } from './columns.actions';
import { catchError, filter, map, of, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { createColumnRequest } from '../../services/api/requests/column/create-column.request';
import { ColumnEntityMapper } from './mappers/column-entity.mapper';
import { Store } from '@ngrx/store';
import { routerSelectors } from '../router/router.selectors';
import { isNotUndefined } from '../../utils/is-not-undefined';
import { getAllColumnsRequest } from '../../services/api/requests/column/get-all-columns.request';
import { columnsSelectors } from './columns.selectors';
import {
  updateColumnRequest,
  UpdateColumnRequestBody,
  UpdateColumnRequestParams,
} from '../../services/api/requests/column/update-column.request';
import { deleteColumnRequest } from '../../services/api/requests/column/delete-column.request';
import { NotificationService } from '../../services/notitication/notification.service';

@Injectable()
export class ColumnsEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private columnEntityMapper = inject(ColumnEntityMapper);
  private store = inject(Store);
  private notificationService = inject(NotificationService);

  getColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(columnsActions.getColumns),
      withLatestFrom(this.store.select(routerSelectors.params.boardId)),
      map(([_, borderId]) => borderId),
      filter(boardId => isNotUndefined(boardId)),
      switchMap(boardId =>
        this.apiService.send(getAllColumnsRequest(boardId)).pipe(
          map(columnDTOs => {
            const columnEntities = columnDTOs.map(columnDTO => this.columnEntityMapper.mapFrom(columnDTO));
            return columnsActions.getColumnsSuccess({ columnEntities });
          }),
        ),
      ),
      catchError(() => of(columnsActions.getColumnsFailed())),
    ),
  );

  createColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(columnsActions.createColumn),
      withLatestFrom(this.store.select(routerSelectors.params.boardId).pipe(filter(boardId => isNotUndefined(boardId)))),
      switchMap(([{ body }, boardId]) =>
        this.apiService.send(createColumnRequest(body, boardId)).pipe(
          map(columnDto => {
            const columnEntity = this.columnEntityMapper.mapFrom(columnDto);
            return columnsActions.createColumnSuccess({ columnEntity });
          }),
        ),
      ),
      catchError(() => of(columnsActions.createColumnFailed())),
    ),
  );

  updateColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(columnsActions.updateColumn),
      withLatestFrom(this.store.select(routerSelectors.params.boardId).pipe(filter(boardId => isNotUndefined(boardId)))),
      switchMap(([{ columnId, data }, boardId]) =>
        this.store.select(columnsSelectors.columnById(columnId)).pipe(
          filter(isNotUndefined),
          take(1),
          switchMap(({ title, order }) => {
            const updatedEntity: UpdateColumnRequestBody = {
              title,
              order,
              ...data,
            };
            const updateColumnRequestParams: UpdateColumnRequestParams = {
              body: updatedEntity,
              boardId,
              columnId,
            };

            return this.apiService.send(updateColumnRequest(updateColumnRequestParams)).pipe(
              map(columnDto => {
                const columnEntity = this.columnEntityMapper.mapFrom(columnDto);
                return columnsActions.updateColumnSuccess({ columnEntity });
              }),
            );
          }),
        ),
      ),
    ),
  );

  dragColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(columnsActions.dragColumn),
      switchMap(({ columnId }) =>
        this.store.select(columnsSelectors.columnById(columnId)).pipe(
          filter(isNotUndefined),
          take(1),
          map(({ order, id }) => columnsActions.updateColumn({ columnId: id, data: { order } })),
        ),
      ),
    ),
  );

  deleteColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(columnsActions.deleteColumn),
      withLatestFrom(this.store.select(routerSelectors.params.boardId).pipe(filter(boardId => isNotUndefined(boardId)))),
      switchMap(([{ columnId }, boardId]) =>
        this.apiService
          .send(
            deleteColumnRequest({
              columnId,
              boardId,
            }),
          )
          .pipe(map(() => columnsActions.deleteColumnSuccess({ columnId }))),
      ),
      catchError(() => of(columnsActions.deleteColumnFailed())),
    ),
  );

  startLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(columnsActions.getColumns, columnsActions.createColumn),
      map(() => columnsActions.startLoading()),
    ),
  );

  stopLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        columnsActions.getColumnsSuccess,
        columnsActions.getColumnsFailed,
        columnsActions.createColumnSuccess,
        columnsActions.createColumnFailed,
      ),
      map(() => columnsActions.stopLoading()),
    ),
  );

  notifyAboutSuccessUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(columnsActions.updateColumnSuccess),
        tap(() => this.notificationService.success('column.update-success')),
      ),
    { dispatch: false },
  );
}

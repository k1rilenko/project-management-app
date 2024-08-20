import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { boardsActions } from './boards.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { getBoardsRequest } from '../../services/api/requests/get-boards.request';
import { BoardEntityMapper } from './mappers/board-entity.mapper';

@Injectable()
export class BoardsEffects {
  private actions$ = inject(Actions);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardsActions.getBoards),
      switchMap(() =>
        this.apiService.send(getBoardsRequest()).pipe(
          map(boards => {
            const boardEntities = boards.map(board => this.boardEntityMapper.mapFrom(board));
            return boardsActions.loadSuccess({ boards: boardEntities });
          }),
          catchError(() => of(boardsActions.loadFailure())),
        ),
      ),
    ),
  );

  startLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardsActions.getBoards),
      map(() => boardsActions.startLoading()),
    ),
  );

  stopLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardsActions.loadSuccess, boardsActions.loadFailure),
      map(() => boardsActions.stopLoading()),
    ),
  );

  constructor(
    private store: Store,
    private apiService: ApiService,
    private boardEntityMapper: BoardEntityMapper,
  ) {}
}

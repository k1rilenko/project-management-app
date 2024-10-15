import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { boardsActions } from './boards.actions';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { BoardEntityMapper } from './mappers/board-entity.mapper';
import { getAllBoardsRequest } from '../../services/api/requests/board/get-all-boards.request';
import { createBoardRequest } from '../../services/api/requests/board/create-board.request';
import { deleteBoardRequest } from '../../services/api/requests/board/delete-board.request';
import { routerSelectors } from '../router/router.selectors';
import { isNotUndefined } from '../../utils/is-not-undefined';
import { getBoardRequest } from '../../services/api/requests/board/get-board.request';

@Injectable()
export class BoardsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardsActions.getBoards),
      switchMap(() =>
        this.apiService.send(getAllBoardsRequest()).pipe(
          map(boards => {
            const boardEntities = boards.map(board => this.boardEntityMapper.mapFrom(board));
            return boardsActions.getBoardsSuccess({ boardEntities: boardEntities });
          }),
          catchError(() => of(boardsActions.getBoardsFailed())),
        ),
      ),
    ),
  );

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardsActions.createBoard),
      switchMap(({ board }) =>
        this.apiService.send(createBoardRequest(board)).pipe(
          map(board => {
            const boardEntity = this.boardEntityMapper.mapFrom(board);
            return boardsActions.createBoardSuccess({ boardEntity });
          }),
          catchError(() => of(boardsActions.deleteBoardFailed())),
        ),
      ),
    ),
  );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardsActions.deleteBoard),
      switchMap(({ boardId }) =>
        this.apiService.send(deleteBoardRequest(boardId)).pipe(
          map(() => boardsActions.deleteBoardSuccess({ boardId })),
          catchError(() => of(boardsActions.deleteBoardFailed())),
        ),
      ),
    ),
  );

  getBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardsActions.getBoard),
      withLatestFrom(this.store.select(routerSelectors.params.boardId)),
      map(([_, boardId]) => boardId),
      filter(boardId => isNotUndefined(boardId)),
      switchMap(boardId => this.apiService.send(getBoardRequest(boardId))),
      map(boardDto => {
        const boardEntity = this.boardEntityMapper.mapFrom(boardDto);
        return boardsActions.getBoardSuccess({ boardEntity });
      }),
      catchError(() => of(boardsActions.getBoardFailed())),
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
      ofType(boardsActions.getBoardsSuccess, boardsActions.getBoardsFailed),
      map(() => boardsActions.stopLoading()),
    ),
  );

  constructor(
    private apiService: ApiService,
    private boardEntityMapper: BoardEntityMapper,
  ) {}
}

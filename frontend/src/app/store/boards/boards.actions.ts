import { createAction, props } from '@ngrx/store';
import { BoardEntity } from './models/board.entity';

export const boardsActions = {
  getBoards: createAction('[Boards] Get Boards'),
  loadSuccess: createAction('[Boards] Load Boards Success', props<{ boards: BoardEntity[] }>()),
  loadFailure: createAction('[Boards] Load Boards Failure'),
  startLoading: createAction('[Boards] Starting Loading'),
  stopLoading: createAction('[Boards] Stop Loading'),
};

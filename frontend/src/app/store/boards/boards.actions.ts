import { createAction, props } from '@ngrx/store';
import { BoardEntity } from './models/board.entity';
import { CreateBoardRequestBody } from '../../services/api/requests/board/create-board.request';

export const boardsActions = {
  getBoards: createAction('[Boards] Get Boards'),
  getBoardsSuccess: createAction('[Boards] Get Boards Success', props<{ boardEntities: BoardEntity[] }>()),
  getBoardsFailed: createAction('[Boards] Get Boards Failed'),

  getBoard: createAction('[Boards] Get Board'),
  getBoardSuccess: createAction('[Boards] Get Board Success', props<{ boardEntity: BoardEntity }>()),
  getBoardFailed: createAction('[Boards] Get Board Failed'),

  createBoard: createAction('[Boards] Create Board', props<{ board: CreateBoardRequestBody }>()),
  createBoardSuccess: createAction('[Boards] Create Board Success', props<{ boardEntity: BoardEntity }>()),
  createBoardFailed: createAction('[Boards] Create Board Failed'),

  deleteBoard: createAction('[Boards] Delete Board', props<{ boardId: BoardEntity['id'] }>()),
  deleteBoardSuccess: createAction('[Boards] Delete Board Success', props<{ boardId: BoardEntity['id'] }>()),
  deleteBoardFailed: createAction('[Boards] Delete Board Failed'),

  // setActiveBoardId: createAction('[Boards] Set Active Board Id', props<{ boardId: BoardEntity['id'] }>()),
  // deleteActiveBoardId: createAction('[Boards] Delete Active Board Id'),

  startLoading: createAction('[Boards] Starting Loading'),
  stopLoading: createAction('[Boards] Stop Loading'),
};

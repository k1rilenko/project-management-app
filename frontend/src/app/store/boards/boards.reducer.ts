import { adapter, DEFAULT_BOARDS_STATE } from './boards.state';
import { createReducer, on } from '@ngrx/store';
import { boardsActions } from './boards.actions';

const actions = boardsActions;

export const boardsReducer = createReducer(
  DEFAULT_BOARDS_STATE,
  on(actions.getBoardsSuccess, (_state, { boardEntities }) => adapter.addMany(boardEntities, _state)),
  
  on(actions.getBoardSuccess, (_state, { boardEntity }) => adapter.addOne(boardEntity, _state)),

  on(actions.createBoardSuccess, (_state, { boardEntity }) => adapter.addOne(boardEntity, _state)),

  on(actions.deleteBoardSuccess, (_state, { boardId }) => adapter.removeOne(boardId, _state)),

  on(actions.startLoading, _state => ({ ..._state, loading: true })),
  on(actions.stopLoading, _state => ({ ..._state, loading: false })),
);

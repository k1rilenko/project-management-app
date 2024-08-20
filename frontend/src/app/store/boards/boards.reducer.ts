import { createBoardRequest } from '../../services/api/requests/create-board.request';
import { adapter, DEFAULT_BOARDS_STATE } from './boards.state';
import { createReducer, on } from '@ngrx/store';
import { boardsActions } from './boards.actions';
import { state } from '@angular/animations';

const actions = boardsActions;

export const boardsReducer = createReducer(
  DEFAULT_BOARDS_STATE,
  on(actions.loadSuccess, (_state, { boards }) => adapter.addMany(boards, _state)),
  on(actions.startLoading, _state => ({ ..._state, loading: true })),
  on(actions.stopLoading, _state => ({ ..._state, loading: false })),
);

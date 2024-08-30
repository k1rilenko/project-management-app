import { createReducer, on } from '@ngrx/store';
import { adapter, DEFAULT_USERS_STATE } from './users.state';
import { usersActions } from './users.actions';

const actions = usersActions;

export const usersReducer = createReducer(
  DEFAULT_USERS_STATE,
  on(actions.getUsersSuccess, (_state, { userEntities }) => adapter.addMany(userEntities, _state)),
  on(actions.setCurrentUserSuccess, (_state, { userEntity }) => ({ ..._state, currentUser: userEntity })),
  on(actions.deleteCurrentUser, _state => ({ ..._state, currentUser: null })),

  on(actions.startLoading, _state => ({ ..._state, loading: true })),
  on(actions.stopLoading, _state => ({ ..._state, loading: false })),
);

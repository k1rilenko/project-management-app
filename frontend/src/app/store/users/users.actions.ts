import { createAction, props } from '@ngrx/store';
import { UserEntity } from './models/user.entity';

export const usersActions = {
  getUsers: createAction('[Users] Get Users'),
  getUsersSuccess: createAction('[Users] Get Users Success', props<{ userEntities: UserEntity[] }>()),
  getUsersFailed: createAction('[Users] Get Users Failed'),

  setCurrentUser: createAction('[Users] Set Current User'),
  setCurrentUserSuccess: createAction('[Users] Set Current User Success', props<{ userEntity: UserEntity | null }>()),
  setCurrentUserFailed: createAction('[Users] Set Current User Failed'),

  startLoading: createAction('[Users] Starting Loading'),
  stopLoading: createAction('[Users] Stop Loading'),
};

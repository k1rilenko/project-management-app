import { createAction, props } from '@ngrx/store';
import { UserEntity } from './models/user.entity';
import { UpdateUserRequestBody } from '../../services/api/requests/user/update-user.request';

export const usersActions = {
  getUsers: createAction('[Users] Get Users'),
  getUsersSuccess: createAction('[Users] Get Users Success', props<{ userEntities: UserEntity[] }>()),
  getUsersFailed: createAction('[Users] Get Users Failed'),

  setCurrentUser: createAction('[Users] Set Current User'),
  setCurrentUserSuccess: createAction('[Users] Set Current User Success', props<{ userEntity: UserEntity }>()),

  deleteCurrentUser: createAction('[Users] Delete Current User'),

  updateCurrentUser: createAction(
    '[Users] Update Current User',
    props<{
      updateUserRequestBody: UpdateUserRequestBody;
    }>(),
  ),
  updateCurrentUserSuccess: createAction('[Users] Update Current User Success', props<{ userEntity: UserEntity }>()),
  updateCurrentUserFailed: createAction('[Users] Update Current User Failed'),

  deleteUser: createAction('[Users] Delete User'),
  deleteUserSuccess: createAction('[Users] Delete User Success', props<{ userId: UserEntity['id'] }>()),
  deleteUserFailed: createAction('[Users] Delete User Failed'),

  startLoading: createAction('[Users] Starting Loading'),
  stopLoading: createAction('[Users] Stop Loading'),
};

import { createAction } from '@ngrx/store';

export const loginActions = {
  login: createAction('[login] Start Login'),
  loginSuccess: createAction('[login] Success'),
  loginFailed: createAction('[login] Failed'),
};

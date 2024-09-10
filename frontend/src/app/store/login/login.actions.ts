import { createAction, props } from '@ngrx/store';
import { SignInRequestBody } from '../../services/api/requests/sign-in.request';
import { Token } from '../../services/token/token.model';

export const loginActions = {
  login: createAction('[Login] Start Login', props<{ requestBody: SignInRequestBody }>()),
  loginSuccess: createAction('[Login] Success', props<{ token: Token }>()),
  loginFailed: createAction('[Login] Failed'),
};

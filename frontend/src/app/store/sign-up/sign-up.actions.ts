import { createAction, props } from '@ngrx/store';
import { SignUpRequestBody } from '../../services/api/requests/sign-up.request';

export const signUpActions = {
  signUp: createAction('[SignUp] SignUp', props<{ requestBody: SignUpRequestBody }>()),
  signUpSuccess: createAction('[SignUp] SignUp Success'),
  signUpFailed: createAction('[SignUp] SignUp Failed'),
};

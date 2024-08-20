import { ApiRequest } from '../models/api-request';
import { SignInDto } from '../dto/sign-in.dto';

export interface SignInRequestBody {
  login: string;
  password: string;
}

export const signInRequest = (body: SignInRequestBody): ApiRequest<SignInRequestBody, SignInDto> => ({
  url: '/signin',
  method: 'POST',
  body,
  tokenStrategy: 'never',
});

import { ApiRequest } from '../models/api-request';
import { SignUpDto } from '../dto/sign-up.dto';

export interface SignUpRequestBody {
  name: string;
  login: string;
  password: string;
}

export const signUpRequest = (body: SignUpRequestBody): ApiRequest<SignUpRequestBody, SignUpDto> => ({
  url: '/signup',
  method: 'POST',
  body,
  tokenStrategy: 'required',
});

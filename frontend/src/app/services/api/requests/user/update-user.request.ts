import { ApiRequest } from '../../models/api-request';
import { UserDto } from '../../dto/user.dto';

export interface UpdateUserRequestBody {
  name: string;
  login: string;
  password: string;
}

export const updateUserRequest = (id: string, body: UpdateUserRequestBody): ApiRequest<UpdateUserRequestBody, UserDto> => ({
  url: `/users/${id}`,
  method: 'PUT',
  body,
  tokenStrategy: 'required',
});

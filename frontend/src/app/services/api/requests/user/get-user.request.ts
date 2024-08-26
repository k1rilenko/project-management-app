import { ApiRequest } from '../../models/api-request';
import { UserDto } from '../../dto/user.dto';

export const getUserRequest = (id: string): ApiRequest<null, UserDto> => ({
  url: `/users/${id}`,
  method: 'GET',
  tokenStrategy: 'required',
});

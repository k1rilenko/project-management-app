import { ApiRequest } from '../../models/api-request';
import { UserDto } from '../../dto/user.dto';

export const getAllUsersRequest = (): ApiRequest<null, UserDto[]> => ({
  url: '/users',
  method: 'GET',
  tokenStrategy: 'required',
});

import { ApiRequest } from '../../models/api-request';
import { UserDto } from '../../dto/user.dto';

export const deleteUserRequest = (id: string): ApiRequest<null, null> => ({
  url: `/users/${id}`,
  method: 'DELETE',
  tokenStrategy: 'required',
});

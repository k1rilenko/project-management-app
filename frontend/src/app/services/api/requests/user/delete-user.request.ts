import { ApiRequest } from '../../models/api-request';

export const deleteUserRequest = (id: string): ApiRequest<null, null> => ({
  url: `/users/${id}`,
  method: 'DELETE',
  tokenStrategy: 'required',
});

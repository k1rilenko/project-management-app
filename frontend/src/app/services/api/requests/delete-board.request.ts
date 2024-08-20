import { ApiRequest } from '../models/api-request';

export const deleteBoardRequest = (id: string): ApiRequest<null, null> => ({
  url: `/boards/${id}`,
  method: 'DELETE',
  tokenStrategy: 'required',
});

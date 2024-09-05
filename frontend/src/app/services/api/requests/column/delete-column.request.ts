import { ApiRequest } from '../../models/api-request';

export interface DeleteColumnRequestParams {
  boardId: string;
  columnId: string;
}

export const deleteColumnRequest = ({ columnId, boardId }: DeleteColumnRequestParams): ApiRequest<null, null> => {
  return {
    url: `/boards/${boardId}/columns/${columnId}`,
    method: 'DELETE',
    tokenStrategy: 'required',
  };
};

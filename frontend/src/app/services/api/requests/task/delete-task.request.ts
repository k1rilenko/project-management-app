import { ApiRequest } from '../../models/api-request';

export interface DeleteTaskRequestParam {
  boardId: string;
  columnId: string;
  taskId: string;
}

export const deleteTaskRequest = (param: DeleteTaskRequestParam): ApiRequest<null, null> => {
  const { boardId, columnId, taskId } = param;
  return {
    url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    method: 'DELETE',
    tokenStrategy: 'required',
  };
};

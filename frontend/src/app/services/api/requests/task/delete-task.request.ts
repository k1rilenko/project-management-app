import { ApiRequest } from '../../models/api-request';
import { BoardDto } from '../../dto/board.dto';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { TaskDto } from '../../dto/task.dto';

export interface DeleteTaskRequestParam {
  boardId: string;
  columnId: string;
  taskId: string;
}

export const createTaskRequest = (param: DeleteTaskRequestParam): ApiRequest<null, null> => {
  const { boardId, columnId, taskId } = param;
  return {
    url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    method: 'DELETE',
    tokenStrategy: 'required',
  };
};

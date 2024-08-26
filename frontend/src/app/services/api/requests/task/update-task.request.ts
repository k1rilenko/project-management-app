import { ApiRequest } from '../../models/api-request';
import { BoardDto } from '../../dto/board.dto';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { TaskDto } from '../../dto/task.dto';
import { UpdateTaskDto } from '../../dto/update-task.dto';

export interface UpdateTaskRequestParam {
  boardId: string;
  columnId: string;
  taskId: string;
  body: UpdateTaskRequestBody;
}

export interface UpdateTaskRequestBody {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export const updateTaskRequest = (param: UpdateTaskRequestParam): ApiRequest<UpdateTaskRequestBody, UpdateTaskDto> => {
  const { boardId, columnId, taskId, body } = param;
  return {
    url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    method: 'PUT',
    body,
    tokenStrategy: 'required',
  };
};

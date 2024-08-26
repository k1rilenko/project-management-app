import { ApiRequest } from '../../models/api-request';
import { BoardDto } from '../../dto/board.dto';
import { CreateTaskDto } from '../../dto/create-task.dto';

export interface CreateTaskRequestParam {
  boardId: string;
  columnId: string;
  body: CreateTaskRequestBody;
}

export interface CreateTaskRequestBody {
  title: string;
  description: string;
  userId: string;
}

export const createTaskRequest = (param: CreateTaskRequestParam): ApiRequest<CreateTaskRequestBody, CreateTaskDto> => {
  const { boardId, columnId, body } = param;
  return {
    url: `/boards/${boardId}/columns/${columnId}/tasks`,
    method: 'POST',
    body,
    tokenStrategy: 'required',
  };
};

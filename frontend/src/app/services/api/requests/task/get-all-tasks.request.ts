import { ApiRequest } from '../../models/api-request';
import { BoardDto } from '../../dto/board.dto';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { TaskDto } from '../../dto/task.dto';

export interface GetTasksRequestParam {
  boardId: string;
  columnId: string;
}

export const getAllTasksRequest = (param: GetTasksRequestParam): ApiRequest<null, TaskDto[]> => {
  const { boardId, columnId } = param;
  return {
    url: `/boards/${boardId}/columns/${columnId}/tasks`,
    method: 'GET',
    tokenStrategy: 'required',
  };
};

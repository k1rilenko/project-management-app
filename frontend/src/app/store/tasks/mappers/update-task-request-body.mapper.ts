import { MapperInterface } from '../../../utils/mapper';
import { TaskEntity } from '../models/task.entity';
import { Injectable } from '@angular/core';
import { UpdateTaskRequestBody } from '../../../services/api/requests/task/update-task.request';

@Injectable({ providedIn: 'root' })
export class UpdateTaskRequestBodyMapper implements MapperInterface<TaskEntity, UpdateTaskRequestBody> {
  mapFrom(param: TaskEntity): UpdateTaskRequestBody {
    return {
      boardId: param.boardId,
      columnId: param.columnId,
      order: param.order,
      description: param.description,
      userId: param.userId,
      title: param.title,
    };
  }
}

import { Injectable } from '@angular/core';
import { MapperInterface } from '../../../utils/mapper';
import { TaskEntity } from '../models/task.entity';
import { TaskDto } from '../../../services/api/dto/task.dto';
import { CreateTaskDto } from '../../../services/api/dto/create-task.dto';
import { UpdateTaskDto } from '../../../services/api/dto/update-task.dto';

@Injectable({ providedIn: 'root' })
export class TaskEntityMapper implements MapperInterface<TaskDto | CreateTaskDto, TaskEntity> {
  //TODO NEED TO REWRITE. PARAM NOT ONLY TaskDto
  mapFrom(param: TaskDto): TaskEntity {
    return { ...param, isLoading: false };
  }
}

import { createAction, props } from '@ngrx/store';
import { TaskEntity } from './models/task.entity';
import { CreateTaskRequestBody, CreateTaskRequestParam } from '../../services/api/requests/task/create-task.request';

export type CreateTaskActionParam = Omit<CreateTaskRequestParam, 'boardId'>;

export const tasksActions = {
  getTasks: createAction('[Task] Get Tasks'),
  getTasksSuccess: createAction('[Task] Get Tasks Success', props<{ taskEntities: TaskEntity[] }>()),
  getTasksFailed: createAction('[Task] Get Tasks Failed'),

  createTask: createAction('[Task] Create Task', props<{ params: CreateTaskActionParam }>()),
  createTaskSuccess: createAction('[Task] Create TaskSuccess', props<{ taskEntity: TaskEntity }>()),
  createTaskFailed: createAction('[Task] Create TaskSuccess'),

  startLoading: createAction('[Tasks] Starting Loading', props<{ taskId: TaskEntity['id'] }>()),
  stopLoading: createAction('[Tasks] Stop Loading', props<{ taskId: TaskEntity['id'] }>()),
};

import { createAction, props } from '@ngrx/store';
import { TaskEntity } from './models/task.entity';
import { CreateTaskRequestParam } from '../../services/api/requests/task/create-task.request';
import { ColumnEntity } from '../columns/models/column.entity';
import { UpdateTaskRequestBody } from '../../services/api/requests/task/update-task.request';

export type CreateTaskActionParam = Omit<CreateTaskRequestParam, 'boardId'>;
export type UpdateTaskActionParam = CreateTaskActionParam;

export const tasksActions = {
  getTasks: createAction('[Task] Get Tasks'),
  getTasksSuccess: createAction('[Task] Get Tasks Success', props<{ taskEntities: TaskEntity[] }>()),
  getTasksFailed: createAction('[Task] Get Tasks Failed'),

  createTask: createAction('[Task] Create Task', props<{ params: CreateTaskActionParam }>()),
  createTaskSuccess: createAction('[Task] Create TaskSuccess', props<{ taskEntity: TaskEntity }>()),
  createTaskFailed: createAction('[Task] Create TaskSuccess'),

  dragTask: createAction(
    '[Task] Drag Task',
    props<{
      prevColumnId: ColumnEntity['id'];
      currentColumnId: ColumnEntity['id'];
      prevIndex: number;
      currentIndex: number;
      taskId: TaskEntity['id'];
    }>(),
  ),

  updateTask: createAction(
    '[Task] Update Task',
    props<{
      params: { taskId: TaskEntity['id']; body: Omit<UpdateTaskRequestBody, 'order'> };
    }>(),
  ),
  updateTaskSuccess: createAction('[Task] Update Task Success', props<{ taskEntity: TaskEntity }>()),
  updateTaskFailed: createAction('[Task] Update Task Failed'),

  deleteTask: createAction('[Task] Delete Task', props<{ taskId: TaskEntity['id'] }>()),
  deleteTaskSuccess: createAction('[Task] Delete Task Success', props<{ taskId: TaskEntity['id'] }>()),
  deleteTaskFailed: createAction('[Task] Delete Task Failed'),

  deleteTasksSuccess: createAction('[Task] Delete Tasks Success', props<{ taskIds: TaskEntity['id'][] }>()),

  startLoading: createAction('[Tasks] Starting Loading', props<{ taskId: TaskEntity['id'] }>()),
  stopLoading: createAction('[Tasks] Stop Loading', props<{ taskId: TaskEntity['id'] }>()),
};

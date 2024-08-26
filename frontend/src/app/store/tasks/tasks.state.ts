import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { TaskEntity } from './models/task.entity';

export type TasksStateInterface = EntityState<TaskEntity>;

export const adapter = createEntityAdapter<TaskEntity>({
  selectId: task => task.id,
  sortComparer: ({ order: a }, { order: b }) => a - b,
});

export const DEFAULT_TASKS_STATE: TasksStateInterface = adapter.getInitialState();

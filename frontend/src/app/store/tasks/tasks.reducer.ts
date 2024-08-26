import { createReducer, on } from '@ngrx/store';
import { adapter, DEFAULT_TASKS_STATE } from './tasks.state';
import { tasksActions } from './tasks.actions';

const actions = tasksActions;

export const tasksReducer = createReducer(
  DEFAULT_TASKS_STATE,
  on(actions.getTasksSuccess, (_state, { taskEntities }) => adapter.addMany(taskEntities, _state)),
  on(actions.createTaskSuccess, (_state, { taskEntity }) => adapter.addOne(taskEntity, _state)),
);

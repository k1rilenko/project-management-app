import { createReducer, on } from '@ngrx/store';
import { adapter, DEFAULT_TASKS_STATE } from './tasks.state';
import { tasksActions } from './tasks.actions';
import { isNotUndefined } from '../../utils/is-not-undefined';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskEntity } from './models/task.entity';

const actions = tasksActions;

export const tasksReducer = createReducer(
  DEFAULT_TASKS_STATE,
  on(actions.getTasksSuccess, (_state, { taskEntities }) => adapter.addMany(taskEntities, _state)),
  on(actions.createTaskSuccess, (_state, { taskEntity }) => adapter.addOne(taskEntity, _state)),
  on(actions.dragTask, (_state, params) => {
    const { currentColumnId, prevColumnId, prevIndex, currentIndex, taskId } = params;

    const columnTasks = _state.ids
      .map(id => _state.entities[id])
      .filter(isNotUndefined)
      .filter(task => task.columnId === currentColumnId);

    const currentTask: TaskEntity | undefined = _state.entities[taskId];

    if (currentColumnId === prevColumnId) {
      moveItemInArray(columnTasks, prevIndex, currentIndex);
    } else if (currentTask) {
      const task: TaskEntity = { ...currentTask, columnId: currentColumnId };
      columnTasks.splice(currentIndex, 0, task);
    }
    return adapter.upsertMany(
      columnTasks.map((task, index) => ({ ...task, order: index + 1 })),
      _state,
    );
  }),
);

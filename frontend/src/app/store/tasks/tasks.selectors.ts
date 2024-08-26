import { tasksFeature } from './tasks.feature';
import { TaskEntity } from './models/task.entity';
import { createSelector } from '@ngrx/store';

const { selectAll, selectEntities, name } = tasksFeature;

const selectTasksForColumn = (columnId: TaskEntity['columnId']) =>
  createSelector(selectAll, taskEntities => taskEntities.filter(taskEntity => taskEntity.columnId === columnId));

const selectTaskById = (id: TaskEntity['id']) => createSelector(selectEntities, taskEntities => taskEntities[id]);

export const tasksSelectors = {
  tasks: selectAll,
  tasksForColumn: selectTasksForColumn,
  taskById: selectTaskById,
};

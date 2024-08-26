import { createFeature } from '@ngrx/store';
import { tasksReducer } from './tasks.reducer';
import { adapter } from './tasks.state';

export const tasksFeature = createFeature({
  name: 'tasks',
  reducer: tasksReducer,
  extraSelectors: ({ selectTasksState }) => ({
    ...adapter.getSelectors(selectTasksState),
  }),
});

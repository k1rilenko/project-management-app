import { createFeature } from '@ngrx/store';
import { columnsReducer } from './columns.reducer';
import { adapter } from './columns.state';

export const columnsFeature = createFeature({
  name: 'columns',
  reducer: columnsReducer,
  extraSelectors: ({ selectColumnsState }) => ({
    ...adapter.getSelectors(selectColumnsState),
  }),
});

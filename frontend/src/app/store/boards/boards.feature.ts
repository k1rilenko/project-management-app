import { createFeature } from '@ngrx/store';
import { boardsReducer } from './boards.reducer';
import { adapter } from './boards.state';

export const boardsFeature = createFeature({
  name: 'boards',
  reducer: boardsReducer,
  extraSelectors: ({ selectBoardsState }) => ({
    ...adapter.getSelectors(selectBoardsState),
  }),
});

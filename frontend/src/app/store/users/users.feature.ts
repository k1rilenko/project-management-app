import { createFeature } from '@ngrx/store';
import { usersReducer } from './users.reducer';
import { adapter } from './users.state';

export const usersFeature = createFeature({
  name: 'users',
  reducer: usersReducer,
  extraSelectors: ({ selectUsersState }) => ({
    ...adapter.getSelectors(selectUsersState),
  }),
});

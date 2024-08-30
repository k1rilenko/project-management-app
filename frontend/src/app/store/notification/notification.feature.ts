import { createFeature } from '@ngrx/store';
import { notificationReducer } from './notification.reducer';
import { adapter } from './notification.state';

export const notificationFeature = createFeature({
  name: 'notifications',
  reducer: notificationReducer,
  extraSelectors: ({ selectNotificationsState }) => ({
    ...adapter.getSelectors(selectNotificationsState),
  }),
});

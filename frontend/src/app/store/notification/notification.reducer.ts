import { createReducer, on } from '@ngrx/store';
import { notificationActions } from './notification.actions';
import { adapter, DEFAULT_NOTIFICATION_STATE } from './notification.state';

const actions = notificationActions;

export const notificationReducer = createReducer(
  DEFAULT_NOTIFICATION_STATE,
  on(actions.addNotification, (state, { notification }) => adapter.addOne(notification, state)),
  on(actions.deleteNotificationById, (state, { id }) => adapter.removeOne(id, state)),
  on(actions.deleteNotification, state => {
    const firstNotificationId = Number(state.ids[state.ids.length - 1]);
    return adapter.removeOne(firstNotificationId, state);
  }),
);

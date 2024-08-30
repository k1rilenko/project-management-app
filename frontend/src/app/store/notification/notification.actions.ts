import { createAction, props } from '@ngrx/store';
import { NotificationEntity } from './models/notification.entity';

export const notificationActions = {
  addNotification: createAction('[Notification] AddNotification', props<{ notification: NotificationEntity }>()),
  deleteNotification: createAction('[Notification] DeleteNotification'),
  deleteNotificationById: createAction(
    '[Notification] DeleteNotificationById',
    props<{
      id: NotificationEntity['id'];
    }>(),
  ),
};

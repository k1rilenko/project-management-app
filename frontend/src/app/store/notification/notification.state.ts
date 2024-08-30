import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { NotificationEntity } from './models/notification.entity';

export type NotificationStateInterface = EntityState<NotificationEntity>;

export const adapter = createEntityAdapter<NotificationEntity>({
  selectId: task => task.id,
  sortComparer: (a, b) => b.timestamp - a.timestamp,
});

export const DEFAULT_NOTIFICATION_STATE: NotificationStateInterface = adapter.getInitialState();

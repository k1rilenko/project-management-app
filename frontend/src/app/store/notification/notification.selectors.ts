import { notificationFeature } from './notification.feature';
import { createSelector } from '@ngrx/store';
import { NotificationEntity } from './models/notification.entity';

const { selectAll, selectEntities } = notificationFeature;

const notificationById = (notificationId: NotificationEntity['id']) =>
  createSelector(selectEntities, notificationEntities => notificationEntities[notificationId]);

export const notificationSelectors = {
  notifications: selectAll,
  notificationById,
};

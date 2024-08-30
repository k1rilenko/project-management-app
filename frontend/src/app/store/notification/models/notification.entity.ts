import { NotificationType } from './notification-type.type';

export interface NotificationEntity {
  id: number;
  timestamp: number;
  message: string;
  type: NotificationType;
}

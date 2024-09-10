import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { notificationActions } from '../../store/notification/notification.actions';
import { NotificationEntity } from '../../store/notification/models/notification.entity';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private store = inject(Store);

  public success(message: NotificationEntity['message']): void {
    this.addNotification(message, 'success');
  }

  public error(message: NotificationEntity['message']) {
    this.addNotification(message, 'error');
  }

  public info(message: NotificationEntity['message']) {
    this.addNotification(message, 'info');
  }

  public warning(message: NotificationEntity['message']) {
    this.addNotification(message, 'warning');
  }

  private addNotification(message: string, type: NotificationEntity['type']): void {
    const notificationEntity: NotificationEntity = {
      message,
      type,
      ...this.generateMetaData(),
    };
    this.store.dispatch(notificationActions.addNotification({ notification: notificationEntity }));
  }

  private generateMetaData(): Pick<NotificationEntity, 'timestamp' | 'id'> {
    return {
      id: Math.random(),
      timestamp: Date.now(),
    };
  }
}

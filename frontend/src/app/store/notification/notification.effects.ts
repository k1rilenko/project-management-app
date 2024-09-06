import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { notificationActions } from './notification.actions';
import { delay, map } from 'rxjs';
import { NOTIFICATION_DISPLAY_TIMER } from '../../services/notitication/notification-display-timer.const';

@Injectable()
export class NotificationEffects {
  private actions$ = inject(Actions);

  deleteNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(notificationActions.addNotification),
      delay(NOTIFICATION_DISPLAY_TIMER),
      map(() => notificationActions.deleteNotification()),
    ),
  );
}

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { notificationActions } from './notification.actions';
import { delay, map } from 'rxjs';

@Injectable()
export class NotificationEffects {
  private actions$ = inject(Actions);

  deleteNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(notificationActions.addNotification),
      delay(10000),
      map(() => notificationActions.deleteNotification()),
    ),
  );
}

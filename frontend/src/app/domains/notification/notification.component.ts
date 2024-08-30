import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationEntity } from '../../store/notification/models/notification.entity';
import { notificationSelectors } from '../../store/notification/notification.selectors';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [AsyncPipe, NgClass],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  public notifications$: Observable<NotificationEntity[]>;

  constructor(private store: Store) {
    this.notifications$ = this.store.select(notificationSelectors.notifications);
  }
}

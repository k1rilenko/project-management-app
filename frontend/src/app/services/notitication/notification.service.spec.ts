import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { Store } from '@ngrx/store';
import { STORE_STUB, STORE_STUB_PROVIDER, StoreStub } from '../../store/__testing__/store.stub';
import { notificationActions } from '../../store/notification/notification.actions';
import { NotificationEntity } from '../../store/notification/models/notification.entity';
import { NotificationType } from '../../store/notification/models/notification-type.type';

fdescribe('NotificationService', () => {
  let service: NotificationService;
  let storeStub: StoreStub;

  const dispatchNotification = (message: string, type: NotificationType) => {
    const notificationEntity = {
      message,
      type,
    };
    service[type](message);

    expect(storeStub.dispatch).toHaveBeenCalledWith(
      notificationActions.addNotification({
        notification: jasmine.objectContaining(notificationEntity) as unknown as NotificationEntity,
      }),
    );
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: Store, useClass: StoreStub }] });
    storeStub = STORE_STUB();
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch success notification', () => {
    dispatchNotification('Success message', 'success');
  });

  it('should dispatch failed notification', () => {
    dispatchNotification('Error message', 'error');
  });

  it('should dispatch info notification', () => {
    dispatchNotification('Info message', 'info');
  });

  it('should dispatch warning notification', () => {
    dispatchNotification('Warning message', 'warning');
  });

  it('should generate metadata with id and timestamp', () => {
    const metadata = service['generateMetaData']();
    expect(metadata.id).toBeGreaterThan(0);
    expect(metadata.timestamp).toEqual(metadata.timestamp);
  });
});

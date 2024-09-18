import { Provider } from '@angular/core';
import { NotificationService } from '../notification.service';
import { TestBed } from '@angular/core/testing';
import createSpy = jasmine.createSpy;

export class NotificationServiceStub {
  success = createSpy('success');
  error = createSpy('error');
  info = createSpy('info');
  warning = createSpy('warning');
}

export const NOTIFICATION_SERVICE_PROVIDER: Provider = {
  provide: NotificationService,
  useClass: NotificationServiceStub,
};

export const NOTIFICATION_SERVICE_STUB = () => TestBed.inject(NotificationService) as unknown as NotificationServiceStub;

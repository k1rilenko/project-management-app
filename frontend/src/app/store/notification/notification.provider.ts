import { EnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { notificationFeature } from './notification.feature';
import { NotificationEffects } from './notification.effects';

export const provideNotificationStore = (): EnvironmentProviders[] => [
  provideState(notificationFeature),
  provideEffects(NotificationEffects),
];

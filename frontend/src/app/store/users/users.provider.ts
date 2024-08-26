import { EnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { usersFeature } from './users.feature';
import { UsersEffects } from './users.effects';

export const provideUsersStore = (): EnvironmentProviders[] => [provideState(usersFeature), provideEffects(UsersEffects)];

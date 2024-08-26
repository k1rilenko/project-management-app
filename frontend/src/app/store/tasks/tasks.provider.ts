import { EnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { tasksFeature } from './tasks.feature';
import { TasksEffects } from './tasks.effects';

export const provideTasksStore = (): EnvironmentProviders[] => [provideState(tasksFeature), provideEffects(TasksEffects)];

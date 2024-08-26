import { EnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { columnsFeature } from './columns.feature';
import { provideEffects } from '@ngrx/effects';
import { ColumnsEffects } from './columns.effects';

export const provideColumnsStore = (): EnvironmentProviders[] => [provideState(columnsFeature), provideEffects(ColumnsEffects)];

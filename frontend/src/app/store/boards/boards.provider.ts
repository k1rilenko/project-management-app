import { EnvironmentProviders } from '@angular/core';
import { provideState, provideStore } from '@ngrx/store';
import { boardsFeature } from './boards.feature';
import { provideEffects } from '@ngrx/effects';
import { BoardsEffects } from './boards.effects';

export const provideBoardStore = (): EnvironmentProviders[] => [provideState(boardsFeature), provideEffects(BoardsEffects)];

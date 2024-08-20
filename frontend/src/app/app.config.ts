import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { boardsReducer } from './store/boards/boards.reducer';
import { BoardsEffects } from './store/boards/boards.effects';
import { provideBoardStore } from './store/boards/boards.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideStore(),
    provideBoardStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};

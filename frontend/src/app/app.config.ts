import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideBoardStore } from './store/boards/boards.provider';
import { provideColumnsStore } from './store/columns/columns.provider';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom-serializer';
import { provideUsersStore } from './store/users/users.provider';
import { provideTasksStore } from './store/tasks/tasks.provider';
import { provideNotificationStore } from './store/notification/notification.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideStore({ router: routerReducer }),
    provideBoardStore(),
    provideColumnsStore(),
    provideUsersStore(),
    provideTasksStore(),
    provideNotificationStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore({ serializer: CustomSerializer }),
  ],
};

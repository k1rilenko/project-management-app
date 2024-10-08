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
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './store/users/users.effects';
import { ModalEffects } from './domains/modal/modal.effects';
import { SignUpEffects } from './store/sign-up/sign-up.effects';
import { LoginEffects } from './store/login/login.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';

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
    provideAnimations(),
    provideEffects([ModalEffects, SignUpEffects, LoginEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore({ serializer: CustomSerializer }),
  ],
};

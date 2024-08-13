import { Routes } from '@angular/router';
import { WelcomePageComponent } from './domains/welcome-page/welcome-page.component';
import { ModalComponent } from './domains/modal/modal.component';
import { createModalRoute } from './domains/modal/factory/modal-route.factory';
import { ModalPathEnum } from './domains/modal/modal-path.enum';

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomePageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome',
  },
  createModalRoute({
    path: ModalPathEnum.LOGIN,
    children: [
      {
        path: '',
        loadComponent: () => import('./domains/login/login.component').then(c => c.LoginComponent),
      },
    ],
  }),
  createModalRoute({
    path: ModalPathEnum.SIGNUP,
    children: [
      {
        path: '',
        loadComponent: () => import('./domains/sign-up/sign-up.component').then(c => c.SignUpComponent),
      },
    ],
  }),
];

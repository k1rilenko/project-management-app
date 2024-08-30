import { Routes } from '@angular/router';
import { WelcomePageComponent } from './domains/welcome-page/welcome-page.component';
import { createModalRoute } from './domains/modal/factory/modal-route.factory';
import { ModalPathEnum } from './domains/modal/modal-path.enum';
import { CONFIRM_DIALOG_PARAM } from './domains/confirmation-dialog/models/confirm-dialog-param.const';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'main',
    loadChildren: () => import('./domains/main-page/main-page.routes').then(m => m.mainPageRoutes),
    canActivate: [NotAuthGuard],
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
  createModalRoute({
    path: ModalPathEnum.CREATE_BOARD,
    children: [
      {
        path: '',
        loadComponent: () => import('./domains/create-board/create-board.component').then(c => c.CreateBoardComponent),
      },
    ],
  }),
  createModalRoute({
    path: ModalPathEnum.CREATE_COLUMN,
    children: [
      {
        path: '',
        loadComponent: () => import('./domains/create-column/create-column.component').then(c => c.CreateColumnComponent),
      },
    ],
  }),
  createModalRoute({
    path: ModalPathEnum.CREATE_TASK,
    children: [
      {
        path: '',
        loadComponent: () => import('./domains/create-task/create-task.component').then(c => c.CreateTaskComponent),
      },
    ],
  }),
  createModalRoute({
    path: ModalPathEnum.CONFIRMATION_DIALOG,
    children: [
      {
        path: `:${CONFIRM_DIALOG_PARAM}/:id`,
        loadComponent: () => import('./domains/confirmation-dialog/confirmation-dialog.component').then(c => c.ConfirmationDialogComponent),
      },
    ],
  }),
];

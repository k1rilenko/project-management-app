import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { LoginComponent } from '../login/login.component';
import { BoardsComponent } from '../boards/boards.component';

export const mainPageRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [{ path: '', component: BoardsComponent }],
  },
];

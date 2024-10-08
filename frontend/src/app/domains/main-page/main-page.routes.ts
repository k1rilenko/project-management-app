import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { BoardsComponent } from '../boards/boards.component';
import { BoardComponent } from '../board/board.component';

export const routeParamKey = {
  boardId: 'boardId',
};

export const mainPageRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', component: BoardsComponent, pathMatch: 'full' },
      { path: 'board', redirectTo: '', pathMatch: 'full' },
      {
        path: 'board/:boardId',
        component: BoardComponent,
      },
    ],
  },
];

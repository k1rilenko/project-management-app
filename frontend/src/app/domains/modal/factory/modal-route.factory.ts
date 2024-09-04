import { Route } from '@angular/router';
import { ModalComponent } from '../modal.component';
import { ModalPathEnum } from '../modal-path.enum';
import { NotAuthGuard } from '../../../guards/not-auth.guard';

export type ModalRouteParams = Omit<Route, 'outlet' | 'component'> & { path: ModalPathEnum };

export function createModalRoute(params: ModalRouteParams): Route {
  return {
    component: ModalComponent,
    outlet: 'modal',
    canActivate: [NotAuthGuard],
    ...params,
  };
}

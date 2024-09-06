import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { usersActions } from '../../store/users/users.actions';
import { tap } from 'rxjs';
import { ModalService } from './modal.service';
import { signUpActions } from '../../store/sign-up/sign-up.actions';

@Injectable()
export class ModalEffects {
  private actions$ = inject(Actions);
  private modalService = inject(ModalService);

  test$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signUpActions.signUpSuccess),
        tap(() => this.modalService.close()),
      ),
    { dispatch: false },
  );
}

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { usersActions } from '../../store/users/users.actions';
import { tap } from 'rxjs';
import { ModalService } from './modal.service';
import { signUpActions } from '../../store/sign-up/sign-up.actions';
import { loginActions } from '../../store/login/login.actions';
import { Router } from '@angular/router';
import { boardsActions } from '../../store/boards/boards.actions';
import { columnsActions } from '../../store/columns/columns.actions';
import { tasksActions } from '../../store/tasks/tasks.actions';

@Injectable()
export class ModalEffects {
  private actions$ = inject(Actions);
  private modalService = inject(ModalService);
  private router = inject(Router);

  closeModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          signUpActions.signUpSuccess,
          loginActions.loginSuccess,
          boardsActions.createBoardSuccess,
          boardsActions.deleteBoardSuccess,
          columnsActions.createColumnSuccess,
          tasksActions.createTaskSuccess,
          tasksActions.deleteTaskSuccess,
          tasksActions.updateTaskSuccess,
        ),
        tap(({ type }) =>
          this.modalService.close().then(() => {
            switch (type) {
              case loginActions.loginSuccess.type:
                this.router.navigate(['/main']);
                return;
            }
          }),
        ),
      ),
    { dispatch: false },
  );
}

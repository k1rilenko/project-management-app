import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { signUpActions } from './sign-up.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { signUpRequest, SignUpRequestBody } from '../../services/api/requests/sign-up.request';
import { ApiService } from '../../services/api/api.service';
import { NotificationService } from '../../services/notitication/notification.service';

@Injectable()
export class SignUpEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private notificationService = inject(NotificationService);

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpActions.signUp),
      switchMap(({ requestBody }) =>
        this.apiService.send(signUpRequest(requestBody)).pipe(
          map(() => signUpActions.signUpSuccess()),
          tap(() => this.notificationService.success('User successfully created')),
          catchError(() => of(signUpActions.signUpFailed())),
        ),
      ),
    ),
  );
}

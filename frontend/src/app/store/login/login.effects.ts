import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api/api.service';
import { NotificationService } from '../../services/notitication/notification.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { loginActions } from './login.actions';
import { signInRequest } from '../../services/api/requests/sign-in.request';
import { TokenService } from '../../services/token/token.service';
import { Token } from '../../services/token/token.model';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private notificationService = inject(NotificationService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  $login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.login),
      switchMap(({ requestBody }) =>
        this.apiService.send(signInRequest(requestBody)).pipe(
          map(({ token }) => loginActions.loginSuccess({ token: token as Token })),
          catchError(() => of(loginActions.loginFailed())),
        ),
      ),
    ),
  );

  $loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginActions.loginSuccess),
        tap(({ token }) => {
          this.tokenService.setToken(token);
          this.notificationService.success('Login success');
        }),
      ),
    { dispatch: false },
  );
}

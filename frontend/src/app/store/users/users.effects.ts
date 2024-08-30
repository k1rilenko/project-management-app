import { effect, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api/api.service';
import { usersActions } from './users.actions';
import { catchError, iif, map, of, switchMap, tap } from 'rxjs';
import { getAllUsersRequest } from '../../services/api/requests/user/get-all-users.request';
import { UserEntityMapper } from './mappers/user-entity.mapper';
import { TokenService } from '../../services/token/token.service';
import { jwtDecode } from 'jwt-decode';
import { toObservable } from '@angular/core/rxjs-interop';
import { getUserRequest } from '../../services/api/requests/user/get-user.request';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private usersEntityMapper = inject(UserEntityMapper);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.getUsers),
      switchMap(() => this.apiService.send(getAllUsersRequest())),
      map(userDTOs => {
        const userEntities = userDTOs.map(userDTO => this.usersEntityMapper.mapFrom(userDTO));
        return usersActions.getUsersSuccess({ userEntities });
      }),
      catchError(() => of(usersActions.getUsersFailed())),
    ),
  );

  setCurrentUser$ = createEffect(() =>
    toObservable(this.tokenService.getTokenSignal()).pipe(
      switchMap(token => {
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userIdFromToken = decodedToken.userId;
          return this.apiService.send(getUserRequest(userIdFromToken)).pipe(
            map(userDto => this.usersEntityMapper.mapFrom(userDto)),
            map(userEntity => usersActions.setCurrentUserSuccess({ userEntity })),
          );
        } else {
          return of(usersActions.deleteCurrentUser());
        }
      }),
      catchError(() => of(usersActions.getUsersFailed())),
    ),
  );

  logoutUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(usersActions.deleteCurrentUser),
        tap(() => this.router.navigateByUrl('welcome')),
      ),
    { dispatch: false },
  );

  startLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.getUsers),
      map(() => usersActions.startLoading()),
    ),
  );

  stopLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.getUsersSuccess, usersActions.getUsersFailed),
      map(() => usersActions.stopLoading()),
    ),
  );
}

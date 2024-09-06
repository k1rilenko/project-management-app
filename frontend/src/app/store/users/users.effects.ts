import { effect, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api/api.service';
import { usersActions } from './users.actions';
import { catchError, concatMap, filter, iif, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { getAllUsersRequest } from '../../services/api/requests/user/get-all-users.request';
import { UserEntityMapper } from './mappers/user-entity.mapper';
import { TokenService } from '../../services/token/token.service';
import { jwtDecode } from 'jwt-decode';
import { toObservable } from '@angular/core/rxjs-interop';
import { getUserRequest } from '../../services/api/requests/user/get-user.request';
import { Router } from '@angular/router';
import { usersSelectors } from './users.selectors';
import { updateUserRequest } from '../../services/api/requests/user/update-user.request';
import { Store } from '@ngrx/store';
import { isNotUndefined } from '../../utils/is-not-undefined';
import { deleteUserRequest } from '../../services/api/requests/user/delete-user.request';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private usersEntityMapper = inject(UserEntityMapper);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  private store = inject(Store);

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

  updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.updateCurrentUser),
      withLatestFrom(this.store.select(usersSelectors.currentUser).pipe(filter(userEntity => !!userEntity))),
      switchMap(([{ updateUserRequestBody }, { id }]) => this.apiService.send(updateUserRequest(id, updateUserRequestBody))),
      map(userDto => this.usersEntityMapper.mapFrom(userDto)),
      map(userEntity => [usersActions.updateCurrentUserSuccess({ userEntity }), usersActions.setCurrentUserSuccess({ userEntity })]),
      concatMap(actions => actions),
      catchError(() => of(usersActions.updateCurrentUserFailed())),
    ),
  );

  deleteCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.deleteUser),
      withLatestFrom(this.store.select(usersSelectors.currentUser).pipe(filter(userEntity => !!userEntity))),
      switchMap(([_, { id }]) =>
        this.apiService.send(deleteUserRequest(id)).pipe(
          map(() => usersActions.deleteUserSuccess({ userId: id })),
          catchError(() => of(usersActions.deleteUserFailed())),
        ),
      ),
    ),
  );

  logoutUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(usersActions.deleteCurrentUser),
        tap(() => {
          this.tokenService.deleteToken();
          this.router.navigateByUrl('welcome');
        }),
      ),
    { dispatch: false },
  );

  autoLogoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.deleteUserSuccess),
      map(() => usersActions.deleteCurrentUser()),
    ),
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

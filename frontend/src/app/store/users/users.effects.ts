import { effect, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api/api.service';
import { usersActions } from './users.actions';
import { catchError, iif, map, of, switchMap, tap } from 'rxjs';
import { getAllUsersRequest } from '../../services/api/requests/user/get-all-users.request';
import { UserEntityMapper } from './mappers/user-entity.mapper';
import { TokenService } from '../../services/token/token.service';
import { jwtDecode } from 'jwt-decode';
import { fromStorage } from '../../services/storage/from-storage.function';
import { toObservable } from '@angular/core/rxjs-interop';
import { getUserRequest } from '../../services/api/requests/user/get-user.request';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private usersEntityMapper = inject(UserEntityMapper);
  private tokenService = inject(TokenService);

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

  //TODO NEED TO REFACTORING
  setCurrentUser$ = createEffect(() =>
    toObservable(this.tokenService.getTokenSignal()).pipe(
      switchMap(token => {
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userIdFromToken = decodedToken.userId;
          return this.apiService.send(getUserRequest(userIdFromToken)).pipe(map(userDto => this.usersEntityMapper.mapFrom(userDto)));
        } else {
          return of(null);
        }
      }),
      map(userEntityOrNull => usersActions.setCurrentUserSuccess({ userEntity: userEntityOrNull })),
      catchError(() => of(usersActions.getUsersFailed())),
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

import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { UserEntity } from './models/user.entity';

export interface UsersStateCommonInterface {
  loading: boolean;
  currentUser: UserEntity | null;
}

export interface UsersStateInterface extends EntityState<UserEntity>, UsersStateCommonInterface {}

export const adapter = createEntityAdapter<UserEntity>({ selectId: user => user.id });

export const DEFAULT_USERS_STATE: UsersStateInterface = adapter.getInitialState({
  loading: false,
  currentUser: null,
});

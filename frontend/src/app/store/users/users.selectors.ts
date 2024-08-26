import { usersFeature } from './users.feature';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersStateInterface } from './users.state';
import { UserEntity } from './models/user.entity';

const { selectAll, selectEntities, name } = usersFeature;

const selectUserById = (userId: UserEntity['id']) => createSelector(selectEntities, userEntities => userEntities[userId]);

export const selectFeature = createFeatureSelector<UsersStateInterface>(name);
export const usersSelectors = {
  users: selectAll,
  currentUser: createSelector(selectFeature, state => state.currentUser),
  userById: selectUserById,
};

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { IRouterState } from './router.state';

export const selectRouterState = createSelector(
  createFeatureSelector<RouterReducerState<IRouterState>>('router'),
  routerReducerState => routerReducerState?.state,
);

const selectData = createSelector(selectRouterState, state => state?.data);
const selectParams = createSelector(selectRouterState, state => state?.params);
const selectQueryParams = createSelector(selectRouterState, state => state?.queryParams);

export const routerSelectors = {
  url: createSelector(selectRouterState, state => state?.url),
  path: createSelector(selectRouterState, state => state?.path),
  fragment: createSelector(selectRouterState, state => state?.fragment),
  urlSegments: createSelector(selectRouterState, state => state?.urlSegments),
  params: {
    boardId: createSelector(selectParams, params => params?.boardId),
    columnId: createSelector(selectParams, params => params?.columnId),
    taskId: createSelector(selectParams, params => params?.taskId),
  },
  queryParams: {
    bonus: createSelector(selectQueryParams, queryParams => queryParams?.bonus),
  },
  data: {
    //fundsTransactionType: createSelector(selectData, data => data?.fundsTransactionType),
  },
};

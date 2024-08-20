import { createSelector } from '@ngrx/store';
import { boardsFeature } from './boards.feature';

const { selectLoading, selectAll, selectTotal } = boardsFeature;

export const boardsSelector = {
  boards: selectAll,
  boardsCount: selectTotal,
  loading: selectLoading,
};

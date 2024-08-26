import { createSelector } from '@ngrx/store';
import { boardsFeature } from './boards.feature';
import { BoardEntity } from './models/board.entity';

const { selectLoading, selectAll, selectTotal, selectEntities } = boardsFeature;

const selectBoard = (boardId: BoardEntity['id']) => createSelector(selectEntities, boards => boards[boardId]);

export const boardsSelector = {
  boards: selectAll,
  boardsCount: selectTotal,
  loading: selectLoading,
  selectBoard,
};

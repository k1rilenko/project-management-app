import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { BoardEntity } from './models/board.entity';
import { ColumnEntity } from '../columns/models/column.entity';

export interface BoardsCommonStateInterface {
  loading: boolean;
}

export interface BoardsStateInterface extends EntityState<BoardEntity>, BoardsCommonStateInterface {}

export const adapter = createEntityAdapter<BoardEntity>({
  selectId: board => board.id,
});

export const DEFAULT_BOARDS_STATE: BoardsStateInterface = adapter.getInitialState({
  loading: false,
});

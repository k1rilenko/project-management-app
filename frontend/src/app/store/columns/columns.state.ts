import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ColumnEntity } from './models/column.entity';

export interface ColumnsCommonStateInterface {
  loading: boolean;
}

export interface ColumnsStateInterface extends EntityState<ColumnEntity>, ColumnsCommonStateInterface {}

export const adapter = createEntityAdapter<ColumnEntity>({
  selectId: column => column.id,
  sortComparer: (a, b) => a.order - b.order,
});

export const DEFAULT_COLUMNS_STATE: ColumnsStateInterface = adapter.getInitialState({ loading: false });

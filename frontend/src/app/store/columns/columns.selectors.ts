import { columnsFeature } from './columns.feature';
import { ColumnEntity } from './models/column.entity';
import { createSelector } from '@ngrx/store';

const { selectAll, selectIds, selectEntities, selectTotal, selectLoading } = columnsFeature;

const selectColumnById = (columnId: ColumnEntity['id']) => createSelector(selectEntities, selectEntities => selectEntities[columnId]);

export const columnsSelectors = {
  columns: selectAll,
  selectIds,
  columnById: selectColumnById,
  selectTotal,
  selectLoading,
};

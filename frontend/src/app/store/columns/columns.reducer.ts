import { createReducer, on } from '@ngrx/store';
import { adapter, DEFAULT_COLUMNS_STATE } from './columns.state';
import { columnsActions } from './columns.actions';

const actions = columnsActions;

export const columnsReducer = createReducer(
  DEFAULT_COLUMNS_STATE,
  on(actions.createColumnSuccess, (_state, { columnEntity }) => adapter.addOne(columnEntity, _state)),
  on(actions.getColumnsSuccess, (_state, { columnEntities }) => adapter.setAll(columnEntities, _state)),
  on(actions.updateColumnSuccess, (_state, { columnEntity }) =>
    adapter.updateOne(
      {
        id: columnEntity.id,
        changes: columnEntity,
      },
      _state,
    ),
  ),
);

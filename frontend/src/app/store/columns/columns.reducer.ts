import { createReducer, on } from '@ngrx/store';
import { adapter, DEFAULT_COLUMNS_STATE } from './columns.state';
import { columnsActions } from './columns.actions';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { isNotUndefined } from '../../utils/is-not-undefined';

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
  on(actions.dragColumn, (_state, { currentIndex, prevIndex }) => {
    const entities = _state.ids.map(id => _state.entities[id]).filter(isNotUndefined);
    moveItemInArray(entities, prevIndex, currentIndex);
    return adapter.setAll(
      entities.map((entity, index) => ({ ...entity, order: index + 1 })),
      _state,
    );
  }),
  on(actions.deleteColumnSuccess, (_state, { columnId }) => adapter.removeOne(columnId, _state)),

  on(actions.resetColumns, () => DEFAULT_COLUMNS_STATE),
  
  on(actions.startLoading, state => ({ ...state, loading: true })),
  on(actions.stopLoading, state => ({ ...state, loading: false })),
);

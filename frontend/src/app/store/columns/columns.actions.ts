import { createAction, props } from '@ngrx/store';
import { ColumnEntity } from './models/column.entity';

import { CreateColumnRequestBody } from '../../services/api/requests/column/create-column.request';
import { UpdateColumnRequestBody } from '../../services/api/requests/column/update-column.request';

export const columnsActions = {
  getColumns: createAction('[Columns] Get Columns'),
  getColumnsSuccess: createAction('[Columns] Get Columns Success', props<{ columnEntities: ColumnEntity[] }>()),
  getColumnsFailed: createAction('[Columns] Get Columns Failed'),

  createColumn: createAction(
    '[Columns] Create Column',
    props<{
      body: CreateColumnRequestBody;
    }>(),
  ),
  createColumnSuccess: createAction('[Columns] Create Column Success', props<{ columnEntity: ColumnEntity }>()),
  createColumnFailed: createAction('[Columns] Create Column Failed'),

  updateColumn: createAction(
    '[Columns] Update Column',
    props<{
      columnId: ColumnEntity['id'];
      data: Partial<UpdateColumnRequestBody>;
    }>(),
  ),
  updateColumnSuccess: createAction('[Columns] Update ColumnSuccess', props<{ columnEntity: ColumnEntity }>()),
  updateColumnFailed: createAction('[Columns] Update ColumnFailed'),

  dragColumn: createAction(
    '[Columns] Drag Column',
    props<{
      columnId: ColumnEntity['id'];
      prevIndex: number;
      currentIndex: number;
    }>(),
  ),

  deleteColumn: createAction('[Columns] Delete Column', props<{ columnId: ColumnEntity['id'] }>()),
  deleteColumnSuccess: createAction('[Columns] Delete Column Success', props<{ columnId: ColumnEntity['id'] }>()),
  deleteColumnFailed: createAction('[Columns] Delete Column Failed'),

  startLoading: createAction('[Columns] Starting Loading'),
  stopLoading: createAction('[Columns] Stop Loading'),
};

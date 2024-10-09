import { AbstractConfirmationDialogConfig } from './abstract-confirmation-dialog-config';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { routerSelectors } from '../../../store/router/router.selectors';
import { filter, map, switchMap, take, tap } from 'rxjs';
import { isNotUndefined } from '../../../utils/is-not-undefined';
import { columnsSelectors } from '../../../store/columns/columns.selectors';
import { columnsActions } from '../../../store/columns/columns.actions';

@Injectable()
export class DeleteColumnConfirmationDialogConfig extends AbstractConfirmationDialogConfig {
  private store = inject(Store);
  private columnId: string | undefined;

  constructor() {
    super();
    this.store
      .select(routerSelectors.params.confirmationDialogParam)
      .pipe(
        filter(isNotUndefined),
        switchMap(columnId =>
          this.store.select(columnsSelectors.columnById(columnId)).pipe(
            filter(isNotUndefined),
            map(columnEntity => ({
              columnId: columnEntity.id,
              columnName: columnEntity.title,
            })),
          ),
        ),
        tap(({ columnId }) => (this.columnId = columnId)),
        switchMap(({ columnName }) => this.getTranslate('confirmation-dialog.delete-column', columnName)),
        take(1),
      )
      .subscribe(text => {
        this.setMessage(text);
      });
  }

  onConfirm() {
    if (this.columnId) {
      this.store.dispatch(columnsActions.deleteColumn({ columnId: this.columnId }));
    }
  }
}

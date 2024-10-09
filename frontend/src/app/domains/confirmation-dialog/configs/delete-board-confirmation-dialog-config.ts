import { AbstractConfirmationDialogConfig } from './abstract-confirmation-dialog-config';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { boardsActions } from '../../../store/boards/boards.actions';
import { filter, map, switchMap, take, tap } from 'rxjs';
import { routerSelectors } from '../../../store/router/router.selectors';
import { isNotUndefined } from '../../../utils/is-not-undefined';
import { boardsSelector } from '../../../store/boards/boards.selectors';

@Injectable()
export class DeleteBoardConfirmationDialogConfig extends AbstractConfirmationDialogConfig {
  private store = inject(Store);
  private boardId: string | undefined;

  constructor() {
    super();
    this.store
      .select(routerSelectors.params.confirmationDialogParam)
      .pipe(
        filter(isNotUndefined),
        switchMap(boardId =>
          this.store.select(boardsSelector.selectBoard(boardId)).pipe(
            filter(isNotUndefined),
            map(boardEntity => ({
              boardTitle: boardEntity.title,
            })),
            tap(() => (this.boardId = boardId)),
          ),
        ),
        switchMap(({ boardTitle }) => this.getTranslate('confirmation-dialog.delete-board', boardTitle)),
        take(1),
      )
      .subscribe(text => this.setMessage(text));
  }

  onConfirm() {
    if (this.boardId) {
      this.store.dispatch(boardsActions.deleteBoard({ boardId: this.boardId }));
    }
  }
}

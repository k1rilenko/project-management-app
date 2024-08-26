import { AbstractConfirmationDialogConfig } from './abstract-confirmation-dialog-config';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { boardsActions } from '../../../store/boards/boards.actions';

@Injectable()
export class DeleteBoardConfirmationDialogConfig extends AbstractConfirmationDialogConfig {
  message = 'Delete Board Confirmation Dialog';
  private store = inject(Store);
  private deleteID = inject(ActivatedRoute).snapshot.paramMap.get('id');

  onConfirm() {
    if (this.deleteID) {
      this.store.dispatch(boardsActions.deleteBoard({ boardId: this.deleteID }));
    }
  }

  onCancel() {
    console.log('Delete Board Confirmation Dialog onCancel');
  }
}

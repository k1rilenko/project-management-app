import { AbstractConfirmationDialogConfig } from './abstract-confirmation-dialog-config';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { boardsActions } from '../../../store/boards/boards.actions';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DeleteBoardConfirmationDialogConfig extends AbstractConfirmationDialogConfig {
  private store = inject(Store);
  private deleteID = inject(ActivatedRoute).snapshot.paramMap.get('confirmationDialogParam');

  constructor() {
    super();
    this.setMessage('Delete Board Confirmation Dialog');
  }

  onConfirm() {
    if (this.deleteID) {
      this.store.dispatch(boardsActions.deleteBoard({ boardId: this.deleteID }));
    }
  }
}

import { AbstractConfirmationDialogConfig } from './abstract-confirmation-dialog-config';
import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { deleteBoardRequest } from '../../../services/api/requests/delete-board.request';
import { ModalService } from '../../modal/modal.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class DeleteBoardConfirmationDialogConfig extends AbstractConfirmationDialogConfig {
  message = 'Delete Board Confirmation Dialog';
  private apiService = inject(ApiService);
  private modalService = inject(ModalService);
  private deleteID = inject(ActivatedRoute).snapshot.paramMap.get('id');

  onConfirm() {
    if (this.deleteID) {
      this.apiService.send(deleteBoardRequest(this.deleteID)).subscribe({ next: () => this.modalService.close() });
    }
  }

  onCancel() {
    console.log('Delete Board Confirmation Dialog onCancel');
  }
}

import { BehaviorSubject } from 'rxjs';
import { inject } from '@angular/core';
import { ModalService } from '../../modal/modal.service';

export abstract class AbstractConfirmationDialogConfig {
  private _message$ = new BehaviorSubject<string | undefined>(undefined);
  public message$ = this._message$.asObservable();
  public confirmText = 'confirm-dialog.confirm';
  public cancelText = 'confirm-dialog.cancel';

  private modalService = inject(ModalService);

  abstract onConfirm(param?: any): void;

  onCancel() {
    this.modalService.close();
  }

  setMessage(message: string) {
    this._message$.next(message);
  }
}

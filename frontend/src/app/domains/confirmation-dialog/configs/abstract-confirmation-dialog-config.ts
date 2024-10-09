import { Observable, ReplaySubject } from 'rxjs';
import { inject } from '@angular/core';
import { ModalService } from '../../modal/modal.service';
import { TranslateService } from '@ngx-translate/core';

export abstract class AbstractConfirmationDialogConfig {
  private _message$ = new ReplaySubject<string>(1);
  public message$ = this._message$.asObservable();
  public confirmText = 'confirm-dialog.confirm';
  public cancelText = 'confirm-dialog.cancel';

  private modalService = inject(ModalService);
  private translateService = inject(TranslateService);

  abstract onConfirm(param?: any): void;

  onCancel() {
    this.modalService.close();
  }

  setMessage(message: string) {
    this._message$.next(message);
  }

  getTranslate(message: string, value: string): Observable<any> {
    return this.translateService.get(message, { value });
  }
}

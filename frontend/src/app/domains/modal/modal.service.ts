import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalPathEnum } from './modal-path.enum';
import { ConfirmationDialogName } from '../confirmation-dialog/models/confirmation-dialog-name.enum';

export type ModalPathTuple = [ModalPathEnum, ConfirmationDialogName, string];

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private router: Router) {}

  public open(path: ModalPathEnum | ModalPathTuple) {
    this.router.navigate([{ outlets: { modal: path } }]);
  }

  public close() {
    return this.router.navigate([{ outlets: { modal: null } }]);
  }
}

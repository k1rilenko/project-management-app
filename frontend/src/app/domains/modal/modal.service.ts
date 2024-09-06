import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalPathEnum } from './modal-path.enum';
import { ConfirmationDialogName } from '../confirmation-dialog/models/confirmation-dialog-name.enum';

type ConfirmationDialogParam = string;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private router: Router) {}

  public open(path: ModalPathEnum): void;
  public open(path: [ModalPathEnum, ConfirmationDialogName]): void;
  public open(path: [ModalPathEnum, ConfirmationDialogName, ConfirmationDialogParam]): void;
  public open(
    path: ModalPathEnum | [ModalPathEnum, ConfirmationDialogName] | [ModalPathEnum, ConfirmationDialogName, ConfirmationDialogParam],
  ): void {
    this.router.navigate([{ outlets: { modal: path } }]);
  }

  public close() {
    return this.router.navigate([{ outlets: { modal: null } }]);
  }
}

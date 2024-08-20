import { Component, inject } from '@angular/core';
import { AbstractConfirmationDialogConfig } from './configs/abstract-confirmation-dialog-config';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { DeleteBoardConfirmationDialogConfig } from './configs/delete-board-confirmation-dialog-config';
import { UpperCasePipe } from '@angular/common';
import { confirmationDialogsConfig } from './configs/confirmation-dialogs.config';
import { ConfirmationDialogName } from './models/confirmation-dialog-name.enum';
import { CONFIRM_DIALOG_PARAM } from './models/confirm-dialog-param.const';
import { confirmationDialogProvider } from './confirmation-dialog.provider';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [UpperCasePipe, ButtonComponent],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  providers: [confirmationDialogProvider],
})
export class ConfirmationDialogComponent {
  public message: string;

  constructor(private abstractConfirmationDialogConfig: AbstractConfirmationDialogConfig) {
    this.message = this.abstractConfirmationDialogConfig.message;
  }

  onConfirm() {
    this.abstractConfirmationDialogConfig.onConfirm();
  }
}

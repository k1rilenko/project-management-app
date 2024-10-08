import { Component, inject } from '@angular/core';
import { AbstractConfirmationDialogConfig } from './configs/abstract-confirmation-dialog-config';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { confirmationDialogProvider } from './confirmation-dialog.provider';
import { ButtonComponent } from '../../shared/button/button.component';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [UpperCasePipe, ButtonComponent, AsyncPipe, TranslateModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  providers: [confirmationDialogProvider],
})
export class ConfirmationDialogComponent {
  public message$: Observable<string | undefined>;
  public confirmText: string;
  public cancelText: string;

  constructor(private abstractConfirmationDialogConfig: AbstractConfirmationDialogConfig) {
    console.log(this.abstractConfirmationDialogConfig);
    this.message$ = this.abstractConfirmationDialogConfig.message$;
    this.confirmText = this.abstractConfirmationDialogConfig.confirmText;
    this.cancelText = this.abstractConfirmationDialogConfig.cancelText;
  }

  onConfirm() {
    this.abstractConfirmationDialogConfig.onConfirm();
  }

  onCancel() {
    this.abstractConfirmationDialogConfig.onCancel();
  }
}

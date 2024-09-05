import { Component, inject } from '@angular/core';
import { AbstractConfirmationDialogConfig } from './configs/abstract-confirmation-dialog-config';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { confirmationDialogProvider } from './confirmation-dialog.provider';
import { ButtonComponent } from '../../shared/button/button.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [UpperCasePipe, ButtonComponent, AsyncPipe],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  providers: [confirmationDialogProvider],
})
export class ConfirmationDialogComponent {
  public message$: Observable<string | undefined>;

  constructor(private abstractConfirmationDialogConfig: AbstractConfirmationDialogConfig) {
    console.log(this.abstractConfirmationDialogConfig);
    this.message$ = this.abstractConfirmationDialogConfig.message$;
  }

  onConfirm() {
    this.abstractConfirmationDialogConfig.onConfirm();
  }
}

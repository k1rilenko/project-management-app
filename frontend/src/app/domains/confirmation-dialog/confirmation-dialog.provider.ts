import { inject, Provider } from '@angular/core';
import { AbstractConfirmationDialogConfig } from './configs/abstract-confirmation-dialog-config';
import { ActivatedRoute } from '@angular/router';
import { CONFIRM_DIALOG_PARAM } from './models/confirm-dialog-param.const';
import { ConfirmationDialogName } from './models/confirmation-dialog-name.enum';
import { confirmationDialogsConfig } from './configs/confirmation-dialogs.config';

export const confirmationDialogProvider: Provider = {
  provide: AbstractConfirmationDialogConfig,
  useFactory: () => {
    const activatedRouteSnapshot = inject(ActivatedRoute);
    const param = activatedRouteSnapshot.snapshot.paramMap.get(CONFIRM_DIALOG_PARAM) as ConfirmationDialogName;
    if (param && confirmationDialogsConfig[param]) {
      return new confirmationDialogsConfig[param]();
    } else {
      throw new Error('Unable to get confirmation dialog config');
    }
  },
};

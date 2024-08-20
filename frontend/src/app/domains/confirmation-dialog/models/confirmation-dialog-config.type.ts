import { AbstractConfirmationDialogConfig } from '../configs/abstract-confirmation-dialog-config';
import { ConfirmationDialogName } from './confirmation-dialog-name.enum';
import { Type } from '@angular/core';

export type ConfirmationDialogConfigType = Record<ConfirmationDialogName, Type<AbstractConfirmationDialogConfig>>;

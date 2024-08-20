import { ConfirmationDialogConfigType } from '../models/confirmation-dialog-config.type';
import { ConfirmationDialogName } from '../models/confirmation-dialog-name.enum';
import { DeleteBoardConfirmationDialogConfig } from './delete-board-confirmation-dialog-config';

export const confirmationDialogsConfig: ConfirmationDialogConfigType = {
  [ConfirmationDialogName.DELETE_BOARD]: DeleteBoardConfirmationDialogConfig,
};

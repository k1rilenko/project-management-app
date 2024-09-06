import { ConfirmationDialogConfigType } from '../models/confirmation-dialog-config.type';
import { ConfirmationDialogName } from '../models/confirmation-dialog-name.enum';
import { DeleteBoardConfirmationDialogConfig } from './delete-board-confirmation-dialog-config';
import { DeleteTaskConfirmationDialogConfig } from './delete-task-confirmation-dialog-config';
import { DeleteColumnConfirmationDialogConfig } from './delete-column-confirmation-dialog-config';
import { DeleteUserConfirmationDialogConfig } from './delete-user-confirmation-dialog-config';

export const confirmationDialogsConfig: ConfirmationDialogConfigType = {
  [ConfirmationDialogName.DELETE_BOARD]: DeleteBoardConfirmationDialogConfig,
  [ConfirmationDialogName.DELETE_TASK]: DeleteTaskConfirmationDialogConfig,
  [ConfirmationDialogName.DELETE_COLUMN]: DeleteColumnConfirmationDialogConfig,
  [ConfirmationDialogName.DELETE_USER]: DeleteUserConfirmationDialogConfig,
};

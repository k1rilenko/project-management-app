export abstract class AbstractConfirmationDialogConfig {
  abstract message: string;

  abstract onConfirm(param?: any): void;

  abstract onCancel(): void;
}

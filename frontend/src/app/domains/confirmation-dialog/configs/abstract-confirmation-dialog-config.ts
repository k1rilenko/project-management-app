import { BehaviorSubject } from 'rxjs';

export abstract class AbstractConfirmationDialogConfig {
  private _message$ = new BehaviorSubject<string | undefined>(undefined);
  public message$ = this._message$.asObservable();

  abstract onConfirm(param?: any): void;

  abstract onCancel(): void;

  public setMessage(message: string) {
    this._message$.next(message);
  }
}

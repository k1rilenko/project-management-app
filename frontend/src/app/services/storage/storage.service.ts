import { Inject, Injectable } from '@angular/core';
import { WA_LOCAL_STORAGE, WA_WINDOW } from '@ng-web-apis/common';
import { LOCAL_STORAGE } from '../../injection-tokens/local-storage.token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    @Inject(LOCAL_STORAGE) private storage: Storage,
    @Inject(WA_WINDOW) private window: Window,
  ) {}

  getItem<T>(key: string): T | null {
    const raw = this.storage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  }

  setItem<T>(key: string, value: T | null): void {
    const stringified = JSON.stringify(value);
    const oldValue = this.storage.getItem(key);
    if (oldValue !== stringified) {
      this.storage.setItem(key, stringified);
      this._dispatchStorageEvent(key, stringified, oldValue, this.storage, this.window);
    }
  }

  private _dispatchStorageEvent(key: string, value: string, oldValue: string | null, storage: Storage, window: Window): void {
    const storageEvent = new StorageEvent('storage', {
      key,
      oldValue,
      newValue: value,
      storageArea: storage,
    });
    window.dispatchEvent(storageEvent);
  }
}

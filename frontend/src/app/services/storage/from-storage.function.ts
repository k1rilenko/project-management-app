import { DestroyRef, effect, inject, signal, untracked, WritableSignal } from '@angular/core';
import { StorageService } from './storage.service';
import { WA_WINDOW } from '@ng-web-apis/common';

export const fromStorage = <TValue>(storageKey: string): WritableSignal<TValue | null> => {
  const storage = inject(StorageService);
  const window = inject(WA_WINDOW);

  const initialValue = storage.getItem<TValue>(storageKey);
  const fromStorageSignal = signal<TValue | null>(initialValue);
  const writeToStorageOnUpdateEffect = effect(() => {
    const updated = fromStorageSignal();
    untracked(() => storage.setItem(storageKey, updated));
  });
  const storageEventListener = (event: StorageEvent) => {
    const isWatchedValueTargeted = event.key === storageKey;
    if (!isWatchedValueTargeted) {
      return;
    }
    const currentValue = fromStorageSignal();
    const newValue = storage.getItem<TValue>(storageKey);
    const hasValueChanged = newValue !== currentValue;
    if (hasValueChanged) {
      fromStorageSignal.set(newValue);
    }
  };
  window.addEventListener('storage', storageEventListener);

  inject(DestroyRef).onDestroy(() => window.removeEventListener('storage', storageEventListener));

  return fromStorageSignal;
};

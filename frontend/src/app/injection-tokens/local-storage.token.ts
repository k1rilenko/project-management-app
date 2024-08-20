import { inject, InjectionToken, PLATFORM_ID, Provider } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { WA_WINDOW } from '@ng-web-apis/common';

export const LOCAL_STORAGE = new InjectionToken<Storage>('LocalStorage token', {
  factory: () => {
    const platformId = inject(PLATFORM_ID);
    return isPlatformServer(platformId) ? new SSRLocalStorage() : inject(WA_WINDOW).localStorage;
  },
});

class SSRLocalStorage implements Storage {
  readonly length = 0;

  constructor() {}

  getItem(key: string): string | null {
    console.error(`Don't use local storage on SSR!`);
    return null;
  }

  setItem(key: string, value: string) {
    console.error(`Don't use local storage on SSR!`);
    return null;
  }

  [name: string]: any;

  clear(): void {}

  key(index: number): string | null {
    throw new Error(`Don't use local storage on SSR!`);
  }

  removeItem(key: string): void {
    throw new Error(`Don't use local storage on SSR!`);
  }
}

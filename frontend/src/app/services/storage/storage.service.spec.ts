import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  const storageKey = 'test';
  const storageValue = 'testValue';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should setItem in storage', () => {
    service.setItem(storageKey, storageValue);
    const value = service.getItem(storageKey);
    expect(value).toBe(storageValue);
  });
});

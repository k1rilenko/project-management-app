import { Provider } from '@angular/core';
import { StorageService } from '../storage.service';
import { TestBed } from '@angular/core/testing';
import createSpy = jasmine.createSpy;

export class StorageServiceStub {
  getItem = createSpy('getItem');
  setItem = createSpy('setItem');
}

export const STORAGE_SERVICE_PROVIDER: Provider = {
  provide: StorageService,
  useClass: StorageServiceStub,
};

export const STORAGE_SERVICE_STUB = () => TestBed.inject(StorageService) as unknown as StorageServiceStub;

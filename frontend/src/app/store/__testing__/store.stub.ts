import createSpy = jasmine.createSpy;
import { Provider } from '@angular/core';
import { Store } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';

export class StoreStub {
  select = createSpy('select');
  dispatch = createSpy('dispatch');
}

export const STORE_STUB_PROVIDER: Provider = { provide: Store, useClass: StoreStub };

export const STORE_STUB = () => TestBed.inject(Store) as unknown as StoreStub;

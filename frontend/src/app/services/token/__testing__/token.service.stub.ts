import { Provider } from '@angular/core';
import { TokenService } from '../token.service';
import { TestBed } from '@angular/core/testing';
import createSpy = jasmine.createSpy;

export class TokenServiceStub {
  getToken = createSpy('getToken');
  getTokenSignal = createSpy('getTokenSignal');
  setToken = createSpy('setToken');
  deleteToken = createSpy('deleteToken');
}

export const TOKEN_SERVICE_PROVIDER: Provider = {
  provide: TokenService,
  useClass: TokenServiceStub,
};

export const TOKEN_SERVICE_STUB = () => TestBed.inject(TokenService) as unknown as TokenServiceStub;

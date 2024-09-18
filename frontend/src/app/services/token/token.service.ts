import { Injectable, WritableSignal } from '@angular/core';
import { Token, Token_Storage_Key } from './token.model';
import { fromStorage } from '../storage/from-storage.function';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly token = fromStorage<Token>(Token_Storage_Key);

  public getToken(): Token {
    return this.token();
  }

  public getTokenSignal(): WritableSignal<Token> {
    return this.token;
  }

  public setToken(token: Token): void {
    this.token.set(token);
  }

  public deleteToken(): void {
    this.token.set(null);
  }
}

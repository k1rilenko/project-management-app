import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRequest } from './models/api-request';
import { enviroment } from '../../../enviroment';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import { TokenStrategy } from './models/token-strategy';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) {}

  public send<RequestBody, ResponseBody>(apiRequest: ApiRequest<RequestBody, ResponseBody>): Observable<ResponseBody> {
    const { apiHost } = enviroment;
    const url = apiHost + apiRequest.url;
    const { queryParams, body, method, tokenStrategy } = apiRequest;
    const withCredentials = true;
    switch (method) {
      case 'GET':
        return this.httpClient.get<ResponseBody>(url, {
          params: queryParams,
          withCredentials,
          headers: this._getHeaders(new HttpHeaders(), tokenStrategy),
        });
      default:
        return this.httpClient.request<ResponseBody>(method, url, {
          params: queryParams,
          body,
          withCredentials,
          headers: this._getHeaders(new HttpHeaders(), tokenStrategy),
        });
    }
  }

  private _getHeaders(requestHeaders: HttpHeaders, tokenStrategy: TokenStrategy): HttpHeaders {
    const headers = requestHeaders;
    const token = this.tokenService.getToken();
    if (tokenStrategy === 'required' && token) {
      return headers.append('Authorization', 'Bearer ' + token);
    }
    return headers;
  }
}

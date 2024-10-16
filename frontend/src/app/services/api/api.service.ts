import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { ApiRequest } from './models/api-request';
import { environment } from '../../../environment';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import { TokenStrategy } from './models/token-strategy';
import { ApiSendOptions, ApiSendOptionsParams, DEFAULT_API_SEND_OPTIONS } from './models/api-send-options';
import { NotificationService } from '../notitication/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private notificationService: NotificationService,
  ) {}

  public send<RequestBody, ResponseBody>(
    apiRequest: ApiRequest<RequestBody, ResponseBody>,
    options?: ApiSendOptionsParams,
  ): Observable<ResponseBody> {
    const { apiUrl } = environment;
    const url = apiUrl + apiRequest.url;
    const { queryParams, body, method, tokenStrategy } = apiRequest;
    const apiSendOptions: ApiSendOptions = {
      ...DEFAULT_API_SEND_OPTIONS,
      ...options,
    };
    const withCredentials = true;
    const { skipErrorHandling } = apiSendOptions;

    return this.httpClient
      .request<ResponseBody>(method, url, {
        params: queryParams,
        body,
        withCredentials,
        headers: this._getHeaders(new HttpHeaders(), tokenStrategy),
        observe: 'response',
      })
      .pipe(
        tap({
          error: (error: HttpErrorResponse) => {
            if (!skipErrorHandling) {
              this.notificationService.error(error.error.message);
            }
          },
        }),
        map((http: HttpResponse<ResponseBody>) => http.body as ResponseBody),
      );
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

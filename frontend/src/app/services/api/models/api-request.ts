import { ApiMethod } from './api-method';
import { ApiQueryParams } from './api-query-params';
import { TokenStrategy } from './token-strategy';

export interface ApiRequest<RequestBody, ResponseBody> {
  url: string;
  method: ApiMethod;
  body?: RequestBody;
  queryParams?: ApiQueryParams;
  responseBody?: ResponseBody;
  tokenStrategy: TokenStrategy;
}

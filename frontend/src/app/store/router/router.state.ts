import { IRouterParams } from './models/router-params';
import { RouterQueryParams } from './models/router-query-params';
import { IRouterData } from './models/router-data';
import { UrlSegment } from '@angular/router';

export interface IRouterState {
  url: string;
  path: string;
  params: IRouterParams;
  queryParams: RouterQueryParams;
  data: IRouterData;
  urlSegments: UrlSegment[];
  fragment: string | null;
}

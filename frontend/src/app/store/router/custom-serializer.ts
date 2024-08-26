import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { IRouterState } from './router.state';

export class CustomSerializer implements RouterStateSerializer<IRouterState> {
  serialize(routerState: RouterStateSnapshot): IRouterState {
    const { url } = routerState;
    const route = routerState.root;

    let state: IRouterState = {
      url,
      path: url.split('?')[0].split('#')[0].split('(modal')[0],
      params: {},
      queryParams: {},
      data: {},
      urlSegments: [],
      fragment: null,
    };

    const stack = [route];

    while (stack.length > 0) {
      const current = stack.pop();

      if (current && current.children.length > 0) {
        for (const child of current.children) {
          const { params, queryParams, data, url: urlSegments, fragment } = child;
          state = {
            ...state,
            params: { ...state.params, ...params },
            queryParams: { ...state.queryParams, ...queryParams },
            data: { ...state.data, ...data },
            urlSegments: [...state.urlSegments, ...urlSegments],
            fragment,
          };

          stack.push(child);
        }
      }
    }

    return state;
  }
}

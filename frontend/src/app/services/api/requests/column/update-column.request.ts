import { ApiRequest } from '../../models/api-request';
import { ColumnDto } from '../../dto/column.dto';

export interface UpdateColumnRequestBody {
  title: string;
  order: number;
}

export interface UpdateColumnRequestParams {
  body: UpdateColumnRequestBody;
  boardId: string;
  columnId: string;
}

export const updateColumnRequest = (params: UpdateColumnRequestParams): ApiRequest<UpdateColumnRequestBody, ColumnDto> => {
  const { boardId, columnId, body } = params;
  return {
    url: `/boards/${boardId}/columns/${columnId}`,
    method: 'PUT',
    body,
    tokenStrategy: 'required',
  };
};

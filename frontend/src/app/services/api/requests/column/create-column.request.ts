import { ApiRequest } from '../../models/api-request';
import { SignInDto } from '../../dto/sign-in.dto';
import { BoardDto } from '../../dto/board.dto';
import { ColumnDto } from '../../dto/column.dto';

export interface CreateColumnRequestBody {
  title: string;
}

export const createColumnRequest = (body: CreateColumnRequestBody, boardId: string): ApiRequest<CreateColumnRequestBody, ColumnDto> => ({
  url: `/boards/${boardId}/columns`,
  method: 'POST',
  body,
  tokenStrategy: 'required',
});

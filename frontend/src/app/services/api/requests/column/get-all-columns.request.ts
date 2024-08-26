import { ApiRequest } from '../../models/api-request';
import { SignInDto } from '../../dto/sign-in.dto';
import { BoardDto } from '../../dto/board.dto';
import { ColumnDto } from '../../dto/column.dto';

export interface CreateColumnRequestBody {
  title: string;
}

export const getAllColumnsRequest = (boardId: string): ApiRequest<null, ColumnDto[]> => ({
  url: `/boards/${boardId}/columns`,
  method: 'GET',
  tokenStrategy: 'required',
});

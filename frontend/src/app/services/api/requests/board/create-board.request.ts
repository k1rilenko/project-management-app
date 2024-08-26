import { ApiRequest } from '../../models/api-request';
import { BoardDto } from '../../dto/board.dto';

export interface CreateBoardRequestBody {
  title: string;
  description: string;
}

export const createBoardRequest = (body: CreateBoardRequestBody): ApiRequest<CreateBoardRequestBody, BoardDto> => ({
  url: '/boards',
  method: 'POST',
  body,
  tokenStrategy: 'required',
});

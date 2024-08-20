import { ApiRequest } from '../models/api-request';
import { SignInDto } from '../dto/sign-in.dto';
import { BoardDto } from '../dto/board.dto';
import { getBoardRequest } from './get-board.request';

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

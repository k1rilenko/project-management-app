import { ApiRequest } from '../models/api-request';
import { SignInDto } from '../dto/sign-in.dto';
import { BoardDto } from '../dto/board.dto';
//TODO NEED REWRITE RESPONSE BODY
export const getBoardRequest = (id: string): ApiRequest<null, BoardDto> => ({
  url: `/boards/${id}`,
  method: 'GET',
  tokenStrategy: 'required',
});

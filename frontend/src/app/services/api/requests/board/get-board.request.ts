import { ApiRequest } from '../../models/api-request';
import { BoardDto } from '../../dto/board.dto';

//TODO NEED REWRITE DTO
export const getBoardRequest = (id: string): ApiRequest<null, BoardDto> => ({
  url: `/boards/${id}`,
  method: 'GET',
  tokenStrategy: 'required',
});

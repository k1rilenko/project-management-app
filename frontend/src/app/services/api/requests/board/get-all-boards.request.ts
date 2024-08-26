import { ApiRequest } from '../../models/api-request';
import { BoardDto } from '../../dto/board.dto';

export const getAllBoardsRequest = (): ApiRequest<null, BoardDto[]> => ({
  url: '/boards',
  method: 'GET',
  tokenStrategy: 'required',
});

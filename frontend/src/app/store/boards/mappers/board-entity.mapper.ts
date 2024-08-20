import { Injectable } from '@angular/core';
import { MapperInterface } from '../../../utils/mapper';
import { BoardDto } from '../../../services/api/dto/board.dto';
import { BoardEntity } from '../models/board.entity';

@Injectable({ providedIn: 'root' })
export class BoardEntityMapper implements MapperInterface<BoardDto, BoardEntity> {
  mapFrom(param: BoardDto): BoardEntity {
    return { ...param };
  }
}

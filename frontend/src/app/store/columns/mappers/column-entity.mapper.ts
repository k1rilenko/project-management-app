import { Injectable } from '@angular/core';
import { MapperInterface } from '../../../utils/mapper';
import { ColumnDto } from '../../../services/api/dto/column.dto';
import { ColumnEntity } from '../models/column.entity';

@Injectable({ providedIn: 'root' })
export class ColumnEntityMapper implements MapperInterface<ColumnDto, ColumnEntity> {
  mapFrom(param: ColumnDto): ColumnEntity {
    return { ...param, isLoading: false };
  }
}

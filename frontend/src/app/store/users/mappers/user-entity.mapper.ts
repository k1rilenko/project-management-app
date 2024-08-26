import { Injectable } from '@angular/core';
import { MapperInterface } from '../../../utils/mapper';
import { UserDto } from '../../../services/api/dto/user.dto';
import { UserEntity } from '../models/user.entity';

@Injectable({ providedIn: 'root' })
export class UserEntityMapper implements MapperInterface<UserDto, UserEntity> {
  mapFrom(param: UserDto): UserEntity {
    return { ...param };
  }
}

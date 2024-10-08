import { UserEntity } from '../../../../store/users/models/user.entity';
import { ColumnEntity } from '../../../../store/columns/models/column.entity';
import { BoardEntity } from '../../../../store/boards/models/board.entity';
import { TaskEntity } from '../../../../store/tasks/models/task.entity';

export interface OptionModel<I, N> {
  value: I;
  name: N;
  selected: boolean;
}

export interface UserOptionModel extends OptionModel<UserEntity['id'], UserEntity['name']> {}

export interface ColumnOptionModel extends OptionModel<ColumnEntity['id'], ColumnEntity['title']> {}

export interface BoardOptionModel extends OptionModel<BoardEntity['id'], BoardEntity['title']> {}

export interface TaskEditOptions {
  userOptions: UserOptionModel[];
  columnOptions: ColumnOptionModel[];
  boardOptions: BoardOptionModel[];
}

export interface TaskEditViewModel extends Pick<TaskEntity, 'title' | 'description' | 'id'>, TaskEditOptions {}

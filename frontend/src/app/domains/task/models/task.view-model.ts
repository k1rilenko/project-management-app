import { TaskEntity } from '../../../store/tasks/models/task.entity';

export interface TaskViewModel extends Pick<TaskEntity, 'title' | 'description' | 'id'> {
  columnName: string;
  userName: string;
}

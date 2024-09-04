import { TaskEntity } from '../../../store/tasks/models/task.entity';

export interface TaskViewModel extends Pick<TaskEntity, 'title' | 'description'> {
  columnName: string;
  userName: string;
}

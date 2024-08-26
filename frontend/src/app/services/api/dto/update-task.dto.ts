import { TaskDto } from './task.dto';

export interface UpdateTaskDto extends Omit<TaskDto, 'files'> {}

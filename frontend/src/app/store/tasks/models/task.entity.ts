export interface TaskEntity {
  id: string;
  title: string;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  order: number;
  isLoading: boolean;
}

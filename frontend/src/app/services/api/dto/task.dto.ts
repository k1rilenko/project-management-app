export interface FileInterface {
  filename: string;
  filesize: number;
}

export interface TaskDto {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: FileInterface[];
}

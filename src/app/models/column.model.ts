import { Task } from './task.model';

export interface Column {
  _id: string;
  title: string;
  taskids: string[];
  tasks?: Task[];
}
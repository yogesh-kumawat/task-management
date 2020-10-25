import { ITask } from './task';

export interface ITaskList {
  _id?: string;
  name: string;
  tasks?: Array<ITask>;
}

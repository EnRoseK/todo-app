import { CategoryModel } from './category';

export interface TaskModel {
  _id: string;
  title: string;
  description?: string;
  isDone: boolean;
  categories?: CategoryModel[];
}

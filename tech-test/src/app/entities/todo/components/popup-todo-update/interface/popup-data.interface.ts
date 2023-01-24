import { ITodoItem } from '../../../todo.interface';

export interface IPopupData {
  type: 'update' | 'create',
  todo?: ITodoItem
}

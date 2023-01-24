import { ITodoItem } from '../../entities/todo/todo.interface';

export const getLastChanges = (todo: ITodoItem): ITodoItem => {
  if (!todo.changes) return todo;
  return getLastChanges(todo.changes);
};

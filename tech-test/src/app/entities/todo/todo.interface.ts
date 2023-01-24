export interface ITodoItem {
  id: number,
  label: string,
  description: string,
  category: string,
  done: boolean | string,
  changes?: ITodoItem
}
